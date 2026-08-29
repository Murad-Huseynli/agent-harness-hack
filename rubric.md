# Rubric — gradeable PASS/FAIL

Graded by `npm run judge` (independent, fresh-context, skeptical) against real evidence
from the verification ladder. A criterion PASSES only on evidence, never on intent.
**Done = every R-criterion PASS.**

## R1 — It is an agent, not a chatbot (hard gate)
- The demo path ends in a **side effect on a real system**, not a message.
- A stranger could not get the same result by pasting our prompt into a chat window.

## R2 — The harness is doing the work
- Real MCP tool connections are wired through TrueForge — not hand-rolled HTTP.
- Agent-written code executes **in the sandbox**, not in our process.
- Subagents handle at least one genuinely delegated sub-job.
- The session survives a reconnect/refresh mid-run and resumes.
- Removing the harness would break the product, not just change its plumbing.

## R3 — Approvals are real
- At least one genuinely irreversible action is gated on human approval.
- The gate blocks: rejecting it actually prevents the side effect (demonstrated).
- Approving one action does not silently authorize the next.

## R4 — The data pipeline is alive
- Data comes from `scrapers/registry.json`, version-controlled, run from the terminal.
- Structural `verify` runs on every fetch.
- A deliberate drift (changed page structure) is **detected**, repaired, logged to
  `scrapers/drift-log.md`, and the pipeline recovers — demonstrated live, not claimed.
- The app reads the fetched data, not a fixture.

## R5 — Verification actually ran
- Typecheck, lint, tests, build: PASS with real output (or explicitly NOT RUN).
- `npm run probe` against the live URL: zero console errors, zero text overlaps.
- Live URL returns 200, public, no auth wall.
- No claim in `brief.md` is unsupported by evidence.

## R6 — Real software hygiene
- Work merged through PRs; **Qodo reviewed at least one** and its findings were
  addressed before merge (visible in PR history).
- No secrets in the repo. `.env` gitignored. Public repo is clean.
- README explains what it is and how to run it.

## R7 — A stranger can drive it
- See `design-rubric.md`. All D-criteria PASS on both critics.
