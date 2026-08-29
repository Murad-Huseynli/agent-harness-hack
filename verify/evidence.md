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
| R6 — Qodo reviewed a PR, findings addressed before merge | NOT RUN | |
