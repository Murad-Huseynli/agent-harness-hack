# Agent Harness Hackathon — build harness

**Event:** WeMakeDevs × Bright Data × TrueFoundry × Qodo × OpenAI — SF, 2026-08-29.
**Hard deadline: 18:00 PT today.** Ship ONE working agent, deployed, submitted.

**This is NOT the FounderOS founder harness.** No discovery gates, no PRD-before-code,
no `/spec-before-code → /architecture-design → /implementation-plan` chain. Write
product code from minute one. The gates below are the only ones that bind.

## What "an agent" means here (the bar the judges set)

> "A chatbot answers questions. An agent *acts* on them: it opens the pull request,
> queries the database, runs the script, sends the message."

If a stranger could get the same result by pasting our prompt into a chat window, we
have not built an agent. Every demo path must end in a side effect on a real system.

## The tracks (a team wins ONE; applying to several is free)

| Track | Prize | What the judge is actually checking |
|---|---|---|
| **Best Use of the Agent Harness** ← primary | NVIDIA DGX Spark | The **TrueForge harness is doing the work**, not sitting under a thin wrapper. Real MCP tool connections, sandboxed execution, human approvals, subagents, sessions that survive reconnect. |
| Best Code Quality | Mac Mini | Repo treated like real software. **Qodo review on PRs is required** — findings dealt with *before* merge, visible in PR history. |
| Best Use of Bright Data | AirPods 4 | Pipeline lives *inside* the agentic workflow. Config version-controlled (see below), not a one-off command. Detects and repairs when a site changes. Data is fresh, structured, and actually used. |
| Best UI | iPad | A stranger can drive it. Shows what the agent **is doing**, what it's **waiting on**, what it **did** — and asks *before* the irreversible step, not after. |
| Best blog post | Keychron | What we built, how it was wired, what broke. Published anywhere. |

## The loop (keep it simple + repeatable)

1. `brief.md` — the job we handed to an agent, who it's for, what "done" looks like.
2. `rubric.md` — gradeable PASS/FAIL criteria the model checks itself against.
3. Build the smallest thing that satisfies the rubric.
4. **Verify without a human:** tests pass **+** live URL responds **+** `npm run judge`
   grades the build against `rubric.md`. That triple is "done".
5. Iterate. Fix the demo path first; keep a known-good fallback.

## Verification ladder (run as far as it exists — never assume a rung)

`typecheck → lint → unit tests → build → npm run probe (live URL, console errors,
text-overlap, CLS, jank) → npm run judge (model-graded vs rubric.md)`

Report each rung PASS with real output, FAIL with the error, or **NOT RUN**. Never
green by assumption. Untested code is marked **UNTESTED**.

## Discipline

- **Verify APIs before use.** Never invent an endpoint, flag, or SDK method. For any
  Claude API/SDK code the `claude-api` skill is the source of truth for model IDs and
  params — never guess (build-day's judge script was already stale within two months).
- **Never claim it works without running it** — real command output, or a real 200
  from the live URL.
- Small diffs. Every merge goes through a PR so Qodo has something to review.
- Secrets live in `.env` (gitignored). The repo is **public** — nothing sensitive lands
  in it, and nothing from `domains/academy/` (student PII) ever enters this repo.

## Bright Data — scraper contract (BINDING, this is the track criterion)

The Bright Data track explicitly asks that scraper settings live in the project rules
file so the coding assistant reuses them automatically. They do. Rules:

- Every scrape target is a row in **`scrapers/registry.json`** — version-controlled,
  never a one-off terminal command. Schema documented in `scrapers/README.md`.
- Run scrapes **from the terminal**, never the web dashboard. Record the exact command
  in the target's `command` field so it is reproducible and diffable.
- **Do not invent Bright Data CLI flags.** The verified surface is
  [`scrapers/brightdata-cli.md`](scrapers/brightdata-cli.md), captured from real `--help`
  output (raw capture: `scrapers/cli-help-output.md`). `brightdata` and `bdata` are the same
  binary. **A command is only "verified" if its full signature including positional
  arguments appears there** — a name alone is not enough. If anything is missing, run
  `--help`, append the output to the capture file, and document the signature before use.
- **Self-heal is human-supervised and can take up to 15 minutes.** Pressing Studio's Heal
  button is not an agentic repair pipeline; we build the detect → fixture → heal → validate
  → approve → promote → re-run loop ourselves. Never start a cold heal on stage.
- Every target declares `verify` — a cheap structural assertion (field present, row
  count > N, type check). The pipeline runs it on every fetch.
- When `verify` fails, that is a **site drift event**: the repair flow re-derives the
  extraction rule, bumps `revision`, writes a dated note to `scrapers/drift-log.md`,
  and re-runs `verify`. Drift must be *detected and logged*, never silently swallowed.
- Data lands structured (typed JSON) in the app's own store. If the app reads a
  hardcoded fixture, the pipeline is decoration and the track is lost.

## Human approval (BINDING — it is also the UI track criterion)

Any irreversible or outward-facing action — writing to a real system, sending a
message, opening/merging a PR, spending money, deleting anything — **pauses for a
human approval** through the harness. The UI must surface the pending action, what it
will touch, and let a person approve or reject. Never widen an approval already given
to cover the next action.

## Skills & subagents available here

- **Skills** (`.claude/skills/`): `code-review`, `security-review`, `run-and-verify`,
  `tdd-cycle`, `implementation-plan`, `debugging`, `frontend-design`, `webapp-testing`,
  `motion-foundations`, `motion-patterns`, `make-interfaces-feel-better`.
- **Subagents** (`.claude/agents/`): `code-reviewer`, `security-reviewer`,
  `frontend-engineer`, `backend-engineer`, `debugger`.
- Delegate to protect context; keep subagent output, don't redo their work.

## Submission checklist (18:00)

- [ ] Public GitHub repo, open source, only today's work
- [ ] Live URL, deployed and responding
- [ ] `brief.md` + `rubric.md` current
- [ ] Qodo run on at least one real PR, findings addressed before merge
- [ ] Bright Data pipeline demonstrated end-to-end **including a drift + repair**
- [ ] Approval gate demonstrated on a genuinely irreversible action
- [ ] Demo video
- [ ] Blog post draft

## Final summary format

**What changed** · **Verified** (commands + real output, or NOT RUN) · **Risks/UNTESTED**
· **Files touched** · **Next step**.
