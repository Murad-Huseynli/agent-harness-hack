# Evidence ledger

Real command output only. `scripts/judge.ts` reads this file and grades `rubric.md`
against it — an empty or aspirational entry produces a FAIL, which is the point.

Every rung is **PASS** (with output), **FAIL** (with the error), or **NOT RUN**.
Never green by assumption.

## Verification ladder

| Rung | Status | Evidence |
|---|---|---|
| typecheck | NOT RUN | |
| lint | NOT RUN | |
| unit tests | NOT RUN | |
| build | NOT RUN | |
| `npm run probe` | NOT RUN | |
| live URL 200 | NOT RUN | |

## Track evidence

| Claim | Status | Evidence |
|---|---|---|
| R2 — harness does the work (MCP / sandbox / subagents / reconnect) | NOT RUN | |
| R3 — approval gate blocks a real irreversible action | NOT RUN | |
| R4 — Bright Data drift detected, repaired, logged | NOT RUN | |
| R6 — Qodo reviewed a PR, findings addressed before merge | **PASS** | [PR #1](https://github.com/Murad-Huseynli/agent-harness-hack/pull/1) — `/agentic_review` run 2026-08-29; `qodo-code-review[bot]` returned 3 findings (1 High, 2 Medium); all 3 fixed in commits on the PR branch; re-review requested; squash-merged as `5c719ee`. Details in README § Qodo Code Review Evidence. |
