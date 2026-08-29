// Independent, model-graded verification rung. A fresh-context judge grades the build
// against rubric.md + design-rubric.md using ONLY the evidence we actually collected.
// Skeptical by instruction — it is not here to rubber-stamp.
//
//   set -a; . ./.env; set +a; npm run judge
//
// Model/params are per the `claude-api` skill (Opus 5: effort lives inside
// output_config, thinking is adaptive-by-default, budget_tokens is a 400).
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, existsSync } from "node:fs";

const read = (p: string, fallback = "") =>
  existsSync(p) ? readFileSync(p, "utf8") : fallback;

const brief = read("brief.md");
const rubric = read("rubric.md");
const designRubric = read("design-rubric.md");
const evidence = read("verify/evidence.md", "(no evidence ledger — treat every rung as NOT RUN)");
const probe = read(
  "verify/out/report.json",
  '(no probe report — verify/out/report.json missing; "npm run probe" has NOT RUN)',
);

const client = new Anthropic();

const SYSTEM = `You are an independent, skeptical judge at the Agent Harness Hackathon
(WeMakeDevs x Bright Data x TrueFoundry x Qodo x OpenAI, San Francisco, 2026-08-29).
You did not build this and you have no stake in it.

Grade ONLY on the evidence supplied. Evidence that is missing, aspirational, or
described rather than shown is a FAIL, not a benefit of the doubt. "NOT RUN" is never
a PASS. Call out real weaknesses; do not rubber-stamp.`;

const PROMPT = `BRIEF:
${brief}

RUBRIC:
${rubric}

DESIGN RUBRIC:
${designRubric}

EVIDENCE LEDGER:
${evidence}

PROBE REPORT (verify/out/report.json):
${probe}

Do all of the following, concisely:

1. Grade EACH R-criterion and EACH D-criterion PASS or FAIL, citing the specific
   evidence you relied on — or naming exactly what evidence is missing.
2. Overall verdict: DONE or NOT DONE.
3. For each track we are entering, the odds we place and why, in one line each:
   Best Use of the Agent Harness / Best Code Quality / Best Bright Data / Best UI.
4. The single biggest weakness a competing team could exploit.
5. The ONE highest-leverage change to make in the time remaining before 18:00 PT.

Be ruthless and specific. Vague praise is worthless to us.`;

try {
  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: 32000,
    thinking: { type: "adaptive" },
    output_config: { effort: "max" },
    system: SYSTEM,
    messages: [{ role: "user", content: PROMPT }],
  });

  const response = await stream.finalMessage();

  for (const block of response.content) {
    if (block.type === "text") process.stdout.write(block.text);
  }
  console.log(
    `\n\n[judge] in=${response.usage.input_tokens} out=${response.usage.output_tokens} stop=${response.stop_reason}`,
  );
} catch (error) {
  if (error instanceof Anthropic.AuthenticationError) {
    console.error("judge: no valid credentials — set ANTHROPIC_API_KEY or run `ant auth login`");
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error("judge: rate limited — retry in a moment");
  } else if (error instanceof Anthropic.APIError) {
    console.error(`judge: API error ${error.status}: ${error.message}`);
  } else {
    console.error("judge failed:", error);
  }
  process.exit(1);
}
