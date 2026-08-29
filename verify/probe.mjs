// Visual + behavioural probe. Drives the app with Playwright and captures what a
// screenshot alone misses: real page-console errors, layout shift, frame-time jank,
// and a DETERMINISTIC text-overlap report. Feed verify/out/*.png + report.json to the
// vision critics; feed report.json to scripts/judge.ts.
//
//   npm run probe
//   APP_URL=https://your-deploy.vercel.app npm run probe
//
// Flow is data-driven from verify/flow.json — no project-specific selectors live here.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const FLOW = JSON.parse(readFileSync(join(HERE, "flow.json"), "utf8"));
const URL = process.env.APP_URL || FLOW.url;
const OUT = join(HERE, "out");
mkdirSync(OUT, { recursive: true });

// ── in-page instrumentation ────────────────────────────────────────────────
const INSTRUMENT = () => {
  window.__cls = 0;
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: "layout-shift", buffered: true });
  } catch {}
};

const START_FPS = () => {
  window.__f = [];
  let last = performance.now();
  const tick = () => {
    const n = performance.now();
    window.__f.push(n - last);
    last = n;
    window.__id = requestAnimationFrame(tick);
  };
  window.__id = requestAnimationFrame(tick);
};

const STOP_FPS = () => {
  cancelAnimationFrame(window.__id);
  const f = window.__f || [];
  if (!f.length) return { count: 0 };
  const avg = f.reduce((a, b) => a + b, 0) / f.length;
  return {
    count: f.length,
    avgMs: +avg.toFixed(1),
    maxMs: +Math.max(...f).toFixed(1),
    jankFrames: f.filter((x) => x > 50).length,
  };
};

// Deterministic text-overlap detector: two visible text-bearing elements whose boxes
// overlap by >35% of the smaller one, and neither contains the other.
const OVERLAPS = () => {
  const els = [...document.querySelectorAll("body *")].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return false;
    return [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
  });
  const items = els
    .map((el) => ({ el, t: el.textContent.trim().slice(0, 28), r: el.getBoundingClientRect() }))
    .filter((x) => x.r.width > 1 && x.r.height > 1 && x.r.top < innerHeight && x.r.bottom > 0 && x.r.left < innerWidth && x.r.right > 0);
  const out = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      if (items[i].el.contains(items[j].el) || items[j].el.contains(items[i].el)) continue;
      const a = items[i].r, b = items[j].r;
      const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      const area = ix * iy;
      const minA = Math.min(a.width * a.height, b.width * b.height);
      if (minA > 0 && area > 0.35 * minA) out.push({ a: items[i].t, b: items[j].t, ratio: +(area / minA).toFixed(2) });
    }
  return out;
};

// ── step runner ────────────────────────────────────────────────────────────
// Supported step keys: wait(ms) · click(text|selector) · hover(text|selector)
//                      scrollTo(selector) · shot(name, fullPage?) · fps(ms)
async function runStep(page, step, vp, r, notes) {
  if (step.wait) await page.waitForTimeout(step.wait);
  if (step.scrollTo) await page.locator(step.scrollTo).scrollIntoViewIfNeeded({ timeout: 8000 });
  if (step.click) {
    const loc = step.selector ? page.locator(step.click) : page.getByText(step.click, { exact: false }).first();
    await loc.click({ timeout: 8000 });
  }
  if (step.hover) {
    const loc = step.selector ? page.locator(step.hover) : page.getByText(step.hover, { exact: false }).first();
    await loc.hover({ timeout: 8000 });
  }
  if (step.fps) {
    await page.evaluate(START_FPS);
    await page.waitForTimeout(step.fps);
    const fps = await page.evaluate(STOP_FPS);
    (r.fps ||= {})[step.name || "window"] = fps;
  }
  if (step.shot) {
    const path = join(OUT, `${vp}-${step.shot}.png`);
    await page.screenshot({ path, fullPage: !!step.fullPage });
    r.shots.push(path);
    r.overlaps[step.shot] = await page.evaluate(OVERLAPS);
  }
}

// ── main ───────────────────────────────────────────────────────────────────
const report = { url: URL, viewports: {} };
const browser = await chromium.launch();

for (const [vp, w, h] of FLOW.viewports) {
  const consoleErrs = [];
  const notes = [];
  const r = { console: consoleErrs, notes, shots: [], overlaps: {} };

  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  page.on("console", (m) => m.type() === "error" && consoleErrs.push(m.text()));
  page.on("pageerror", (e) => consoleErrs.push("pageerror: " + e.message));
  await page.addInitScript(INSTRUMENT);

  try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1200);
    for (const step of FLOW.steps) {
      try {
        await runStep(page, step, vp, r, notes);
      } catch (e) {
        notes.push(`step ${JSON.stringify(step)}: ${e.message}`);
      }
    }
  } catch (e) {
    notes.push("navigation: " + e.message);
  }

  r.cls = await page.evaluate(() => Number((window.__cls || 0).toFixed(4)));
  report.viewports[vp] = r;
  await page.close();
}

await browser.close();
writeFileSync(join(OUT, "report.json"), JSON.stringify(report, null, 2));

let failed = false;
for (const [vp, r] of Object.entries(report.viewports)) {
  const overlaps = Object.values(r.overlaps).flat();
  console.log(`\n[${vp}]`);
  console.log("  console errors:", r.console.length ? JSON.stringify(r.console, null, 2) : "none ✅");
  console.log("  probe notes:   ", r.notes.length ? JSON.stringify(r.notes, null, 2) : "none");
  console.log("  CLS:           ", r.cls);
  if (r.fps) console.log("  frame times:   ", JSON.stringify(r.fps));
  console.log("  text overlaps: ", overlaps.length ? JSON.stringify(overlaps, null, 2) : "none ✅");
  if (r.console.length || overlaps.length) failed = true;
}
console.log(`\nartifacts: ${OUT}/`);
console.log(failed ? "\n❌ PROBE FAIL — console errors or text overlaps present" : "\n✅ PROBE PASS");
process.exit(failed ? 1 : 0);
