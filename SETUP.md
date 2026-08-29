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
| **TrueForge installed + RUNNING** | ✅ `v0.1.4` up on **http://localhost:8790** (`HTTP 200`) |
| Daytona key | ⬜ absent — **$200 free compute, no card required** (daytona.io/pricing) |
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
✅ **Already verified — it boots and serves.** Real CLI output:

```
Usage:
  npx @truefoundry/trueforge
  npx @truefoundry/trueforge --port <n>

TrueForge v0.1.4. Start the agent server.
Defaults to standalone mode (SQLite, no Redis) — local use only, not production-safe.
Set STANDALONE=false with Postgres and Redis for multi-replica peering.

Options:
  --port <n>   HTTP port (default: 8790, or PORT env)
```

Open **http://localhost:8790**. Then wire, in this order, from the real docs:
1. **Model credential** — configured separately and referenced by name → https://trueforge.dev/models
2. **Daytona sandbox** — needs an API key with permission to create sandboxes *and*
   create/use the configured snapshot → https://trueforge.dev/sandbox
3. **MCP servers** — no-auth, static headers, or OAuth dynamic client registration.
   Non-local OAuth callbacks need a reachable `PUBLIC_BASE_URL` → https://trueforge.dev/mcp-servers
4. **Approvals** — default targets MCP tools annotated `write` or `destructive`;
   configuration is API-oriented → https://trueforge.dev/create-agent/overview

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

Real docs live at **https://trueforge.dev/introduction** (not `/docs/quickstart`, which 404s):
`/models` · `/mcp-servers` · `/skills` · `/sandbox` · `/key-features/overview` ·
`/create-agent/overview` · `/api/overview`

### Primitives worth knowing before you design anything

- **Clarifying-question cards** — the harness can interrupt a run with a *structured,
  selectable* card and resume from the choice. This is a built-in elicitation instrument.
- **Skills require a sandbox.** They are Git-backed `SKILL.md` packages materialized at
  `/opt/tfy/skills/...`. Skills and Daytona are coupled, not independent.
- **Code Mode** writes Python *inside the sandbox* and calls MCP tools through a bridge,
  so only the printed result enters model context.
- **Generative UI** emits OpenUI snippets rendered through *registered React components*
  (charts, tables, cards, forms). It does **not** execute arbitrary generated frontend code.
- **Compaction** fires at ~80% of context or a 50,000-input-token fallback. A 90-second
  run will not reach it — it must be forced to demo.
- **Sessions** model `Agent → Session → Turn → Event → Delta`, streamed over SSE.
- App version `0.1.4` (Aug 19). A `0.2.0-rc.0` prerelease and `charts/trueforge@0.1.6-rc.0`
  exist — **do not conflate the chart version with the app version.**

---

## ⚠️ Deadline may not be 18:00 today — verify with organizers

The official event site describes the **online** hackathon as **Aug 24–30**, with
submission listed as **Aug 30, 20:00 London**. Our in-person brief says 18:00 PT today.
Whether 18:00 PT is a separate in-person deadline is **UNVERIFIED**.

**Ask an organizer or check Discord.** Operate against 18:00 PT until told otherwise —
but if the online track really runs to Aug 30, that is up to a day more, and it changes
what is worth attempting. Sources:
[event](https://www.wemakedevs.org/hackathons/trueforge) ·
[rules](https://www.wemakedevs.org/hackathons/trueforge/rules)

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
