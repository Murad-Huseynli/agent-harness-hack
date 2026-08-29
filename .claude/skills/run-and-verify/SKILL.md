---
name: run-and-verify
description: Execute the verification ladder with real output before claiming any work is done. Use before completion claims, commits of significant work, and PRs. The antidote to "should work".
---

# Run and Verify

## Purpose
No completion claims without execution evidence. This skill is the gate between "wrote code" and "done".

## Workflow
1. Open the command table in `AGENTS.md` / `docs/agent-harness/verification.md`. Identify which rungs have real commands today.
2. Run the ladder bottom-up: format → lint → typecheck → unit → integration → security/dep audit → build → smoke.
   - Paste trimmed real output per rung.
   - Rungs without real commands: report **NOT RUN (no command exists)** — never assumed, never simulated.
3. Rung 9 — memory consistency: do the claims you're about to make match what `memory/` says? Any decision violated?
4. Rung 10 — README/demo accuracy: does anything you changed make README/docs false? Fix or flag.
5. A rung fails → stop the ladder, report the failure verbatim, fix (or surface), restart from the failed rung.
6. Summarize: rung-by-rung PASS / FAIL / NOT RUN table.

## Required evidence
Actual command output for every PASS/FAIL. Exit codes when relevant.

## Stop conditions
- Two consecutive failed fix attempts on the same rung → stop; systematic debugging or human input, not a third blind try.
- Verification would require installing tools → ask first.

## Output format
`rung | command | result | evidence-snippet` table + one-line honest verdict ("done", or "NOT done: rungs X,Y unmet").

## Memory updates
New working verification commands → update `AGENTS.md` table + `memory/learnings.md`. Failures with root cause → `memory/failures.md`.
