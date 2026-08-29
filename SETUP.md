# Setup — read this first

**Agent Harness Hackathon · SF · 2026-08-29 · submission 18:00 PT.**
Repo: https://github.com/Murad-Huseynli/agent-harness-hack

Everything below marked ✅ has actually been run. Everything marked ⬜ has **not** been
verified yet — do not trust it until you have run it. Nothing here is guessed.

---

## Status board

| Thing | State |
|---|---|
| Repo, public, pushed | ✅ `main` @ github.com/Murad-Huseynli/agent-harness-hack |
| `npm install` | ✅ 5 deps resolved (`@anthropic-ai/sdk@0.104.2`, `playwright@1.62.1`, `tsx`, `typescript`, `@types/node`) |
| Node | ✅ v26.0.0 local — TrueForge needs **>= 22.14** |
| Build harness (rubrics, probe, judge, scraper contract) | ✅ committed |
| Codex CLI | ✅ `codex-cli 0.144.1`, ChatGPT OAuth |
| `gh` CLI | ✅ authed as `Murad-Huseynli` |
| **TrueForge installed** | ⬜ **not yet — blocker #1** |
| Daytona key | ⬜ absent |
| Bright Data connected | ⬜ account + $50 credits exist, not wired |
| Qodo GitHub App on this repo | ⬜ unverified — check in the GitHub UI |
| OpenAI platform key | ⬜ $50 credits added, key not in any `.env` |
| **The idea** | ⬜ ideation loop running — certificate lands before you need it |

---

## First 20 minutes — split three ways

**Person 1 — runtime (highest risk, do this first)**
```bash
git clone https://github.com/Murad-Huseynli/agent-harness-hack
cd agent-harness-hack && npm install
npx @truefoundry/trueforge@latest          # local mode, SQLite, one process
```
Then answer these four and write the answers straight into this file:
1. What is the exact `.env` filename and which env vars does it read?
2. How are MCP servers registered — what file, what shape?
3. How is the Daytona sandbox enabled, and which env var?
4. What port/URL does the chat UI come up on?

These are **not documented in the README** — the repo's README has the install command
and nothing else. Get them from the running process and the quickstart, then commit them.

**Person 2 — credentials**
Collect at the venue and put in `.env` (gitignored, never commit):
`OPENAI_API_KEY` (the $50 attendee credits) · Daytona API key · Bright Data token.
Then confirm the **Qodo GitHub App** is installed on this repo — that gates a whole track.

**Person 3 — pitch + blog**
Start the blog post now, not at 17:00. `demo-script.md` is the skeleton.

---

## Verified facts about TrueForge

- Repo: https://github.com/truefoundry/trueforge · **MIT** · TypeScript · also on PyPI
- Launched 2026-08-19. Local mode = one process + SQLite. Hosted = Postgres + Redis via
  Docker Compose or Helm.
- Install: `npx @truefoundry/trueforge@latest`
- Three surfaces: a **chat UI**, an **HTTP API + TypeScript SDK**, and an **embeddable UI SDK**.
- Ships: 40+ built-in tools · **Tavily-powered web search** · sandboxed execution ·
  human-in-the-loop approvals · automatic context compaction · **generative UI streaming** ·
  MCP tools · skills · Code Mode · sessions.
- Vendor-neutral: any LLM, swappable per task.
- Claimed 30–75% cheaper task completion than Claude Managed Agents.

Sources: [truefoundry/trueforge](https://github.com/truefoundry/trueforge) ·
[TrueForge product page](https://www.truefoundry.com/trueforge) ·
[launch blog](https://www.truefoundry.com/blog/engineering/trueforge-open-source-agent-harness/) ·
[VentureBeat](https://venturebeat.com/orchestration/truefoundrys-open-source-ai-agent-harness-trueforge-boasts-30-75-cheaper-task-completion-than-claude-managed-agents)

⚠️ `https://trueforge.dev/docs/quickstart` returns **404** — find the real docs path before
relying on it.

---

## Repo conventions

- **Every change goes through a PR.** The Qodo track needs real PRs with
  `/agentic_review` run on them and findings addressed *before* merge. Two good PRs beat
  twenty commits to `main`.
- Rules live in `CLAUDE.md` (symlinked as `CODEX.md`, pointed at by `AGENTS.md`) — the
  five tracks, the verification ladder, the Bright Data scraper contract, the binding
  human-approval rule.
- `rubric.md` / `design-rubric.md` are the PASS/FAIL definition of done.
- `verify/evidence.md` is the ledger — every rung is PASS with output, FAIL with the
  error, or **NOT RUN**. Never green by assumption.

```bash
npm run probe    # drives the live URL: console errors, text overlap, CLS, frame times
npm run judge    # independent model-graded pass against rubric.md
npm run record   # captioned demo video off the live UI
```

`npm run probe` needs browsers once: `npx playwright install chromium`.
There is **no `dev` script yet** — the product stack is chosen when the idea locks.

---

## Bright Data — the contract is already written

`CLAUDE.md` § "Bright Data — scraper contract" is binding and is exactly what that track
asks for. Short version: every target is a row in `scrapers/registry.json`, runs from the
terminal, declares a `verify` assertion, and a `verify` failure is a **drift event** that
gets repaired, `revision`-bumped, and logged to `scrapers/drift-log.md`.
**Never invent a Bright Data CLI flag** — copy it from real `--help` output.
