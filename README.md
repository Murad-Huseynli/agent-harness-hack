# agent-harness-hack

Built at the **Agent Harness Hackathon** (WeMakeDevs × Bright Data × TrueFoundry ×
Qodo × OpenAI) — San Francisco, 29 August 2026, in one day.

> _One-liner goes here once `brief.md` is filled in._

## Research

The idea is backed by a full literature review, a novelty audit against the five closest
published papers, structured ideation, and a three-hat adversarial review — all completed
before any product code. **Start at [`research/README.md`](research/README.md).**

The claim, stated honestly:

> A production agent harness's human-approval queue is an already-instrumented
> preference-elicitation instrument that current systems discard as a boolean. We read it as
> structured evidence — approve, deny, edit-then-approve, choose-among, re-run, hesitate —
> into a per-user posterior over *attributes of proposed actions*, and use that posterior to
> decide the agent's authority over irreversible actions: act, or ask.

## What it does

TBD — see [`brief.md`](./brief.md).

## Running it

```bash
npm install
cp .env.example .env   # fill in credentials
npm run dev
```

## Verifying it

```bash
npm run probe    # drive the live URL: console errors, text overlap, CLS, frame times
npm run judge    # independent model-graded pass against rubric.md
```

## How it's built

- **[TrueForge](https://github.com/truefoundry)** — the agent harness: MCP tool
  connections, sandboxed execution, human approvals, subagents, durable sessions.
- **Bright Data** — the live-web data pipeline. Scraper config is version-controlled
  in [`scrapers/`](./scrapers/) and reused automatically by the coding assistant via
  [`CLAUDE.md`](./CLAUDE.md).
- **Qodo** — AI code review on every pull request.

The build rules, gates, and scraper contract live in [`CLAUDE.md`](./CLAUDE.md).

## Qodo Code Review Evidence

Every change reaches `main` through a pull request reviewed by Qodo's agentic review.

### PR #1 — [fix(brightdata): replace guessed env var, pin verified CLI surface](https://github.com/Murad-Huseynli/agent-harness-hack/pull/1)

Run with `/agentic_review`. Qodo returned three findings. **All three were valid and all
three were fixed before merge.**

**Finding 3 (High) — "Command signatures remain guessed."**
The scraper contract listed `brightdata scraper create ...` with literal ellipses, omitting
required positional arguments — while `CLAUDE.md` only required `--help` for commands
*absent* from the page. Qodo identified the trap: an assistant would treat the listed
commands as verified and still have to guess their arguments, "producing invalid or unsafe
repair commands." This was a flaw in the rule's design, not a typo.

*Fix:* installed the CLI and captured real signatures —
`scraper heal <collector_id> <prompt>`, `scraper approve <collector_id>` — and rewrote the
rule so a command counts as verified only when its **full signature including positional
arguments** is documented. Raw `--help` output committed verbatim to
[`scrapers/cli-help-output.md`](scrapers/cli-help-output.md).

**Finding 2 (Medium) — "Valid bdata alias forbidden."**
The doc asserted "the binary is `brightdata`, not `bdata`." Qodo flagged this as false.
Verified against the npm manifest: `{ brightdata: 'dist/index.js', bdata: 'dist/index.js' }`
— both install, identical entry point. The wrong claim had already been used to tell a
teammate their command was invented.

*Fix:* corrected, and kept **visible** in
[`scrapers/brightdata-cli.md`](scrapers/brightdata-cli.md) rather than silently edited.

**Finding 1 (Medium) — "Cli behavior lacks execution evidence."**
A functional claim about which env var the CLI reads was sourced from documentation, not
execution.

*Fix:* real `--help` output committed; the env-var precedence claim downgraded to
explicitly unconfirmed pending an authenticated `brightdata config get`.

Re-review requested on the same PR after the fixes, so the history shows
**review → response → verification**.

## License

MIT — see [LICENSE](./LICENSE).
