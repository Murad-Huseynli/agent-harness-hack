// Demo-video recorder: drives the live app with captions and a title card, recording
// off the real UI. Script lives in verify/flow.json → "video".
//
//   npm run record            →  verify/out/*.webm
//   APP_URL=https://… npm run record
//
// Convert afterwards:  ffmpeg -i verify/out/<file>.webm -c:v libx264 -crf 20 demo.mp4
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const FLOW = JSON.parse(readFileSync(join(HERE, "flow.json"), "utf8"));
const URL = process.env.APP_URL || FLOW.url;
const OUT = join(HERE, "out");
const V = FLOW.video || {};
mkdirSync(OUT, { recursive: true });

const W = 1920, H = 1080;
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
  recordVideo: { dir: OUT, size: { width: W, height: H } },
});
const page = await ctx.newPage();

await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 });

await page.addStyleTag({
  content: `
  #vid-cap, #vid-card { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; }
  #vid-cap { position: fixed; left: 50%; bottom: 7%; transform: translateX(-50%); z-index: 99998;
    background: rgba(10,12,18,0.86); color: #eef2f9; backdrop-filter: blur(10px);
    padding: 16px 30px; border-radius: 999px; font-size: 30px; font-weight: 500;
    letter-spacing: -0.01em; border: 1px solid rgba(255,255,255,0.10); opacity: 0;
    transition: opacity .4s ease; max-width: 78vw; text-align: center;
    box-shadow: 0 16px 50px rgba(0,0,0,.45); }
  #vid-card { position: fixed; inset: 0; z-index: 100000; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #0a0c12; color: #eef2f9;
    opacity: 0; transition: opacity .35s ease; text-align: center; gap: 18px; }
  #vid-card h1 { font-size: 88px; font-weight: 600; line-height: 1; margin: 0; letter-spacing: -0.03em; }
  #vid-card p  { font-size: 30px; color: #aebbd0; margin: 0; max-width: 60vw; }
`,
});
await page.evaluate(() => {
  for (const id of ["vid-cap", "vid-card"]) {
    const el = document.createElement("div");
    el.id = id;
    document.body.appendChild(el);
  }
});

const cap = (t) =>
  page.evaluate((t) => {
    const e = document.getElementById("vid-cap");
    e.textContent = t || "";
    e.style.opacity = t ? "1" : "0";
  }, t);
const card = (html) =>
  page.evaluate((html) => {
    const e = document.getElementById("vid-card");
    e.innerHTML = html || "";
    e.style.opacity = html ? "1" : "0";
  }, html);

// title card
if (V.title) {
  await card(`<h1>${V.title}</h1><p>${V.subtitle || ""}</p>`);
  await page.waitForTimeout(3000);
  await card("");
  await page.waitForTimeout(600);
}

// scripted beats: { cap, wait, click, scrollTo, selector }
for (const s of V.steps || []) {
  try {
    if (s.cap !== undefined) await cap(s.cap);
    if (s.scrollTo) await page.locator(s.scrollTo).scrollIntoViewIfNeeded({ timeout: 8000 });
    if (s.click) {
      const loc = s.selector ? page.locator(s.click) : page.getByText(s.click, { exact: false }).first();
      await loc.click({ timeout: 8000 });
    }
    await page.waitForTimeout(s.wait ?? 2500);
  } catch (e) {
    console.error(`step failed (continuing): ${JSON.stringify(s)} — ${e.message}`);
  }
}

await cap("");
await page.waitForTimeout(800);
await ctx.close(); // flushes the video file
await browser.close();
console.log(`video written to ${OUT}/  →  convert with ffmpeg -i <file>.webm -c:v libx264 -crf 20 demo.mp4`);
