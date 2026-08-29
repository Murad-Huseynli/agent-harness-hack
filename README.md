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

## License

MIT — see [LICENSE](./LICENSE).
