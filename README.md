# agent-harness-hack

Built at the **Agent Harness Hackathon** (WeMakeDevs × Bright Data × TrueFoundry ×
Qodo × OpenAI) — San Francisco, 29 August 2026, in one day.

> _One-liner goes here once `brief.md` is filled in._

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
