---
name: code-review
description: Adversarial review of a diff, branch, or PR — hunts hallucinated APIs, overengineering, scope creep, missing tests, and unverified claims. Use before committing significant work, before merges, and on request.
---

# Code Review (adversarial)

## Purpose
Find what's wrong before a human or production does. Approval is the absence of findings, not the goal.

## Workflow
1. Establish the claimed scope (task/spec) and get the actual diff (`git diff`, PR, or branch range).
2. Delegate to the `code-reviewer` subagent for the main pass (it has the checklist: hallucination hunt, scope trace, simplicity, correctness, tests-actually-ran, security quick-pass, claims audit).
3. **Adversarial escalation** for significant changes — pick one:
   - Second independent session/agent (e.g., Codex per `docs/agent-harness/codex.md`) reviews the same diff in its own worktree and may run verification there.
   - Or re-review your own work with the explicit stance "assume the implementer was sloppy; find three real problems."
4. Triage findings with the human: fix now / ticket / reject-with-reason. Implementer fixes; reviewer re-checks only the fixes.
5. Iterate until REQUEST-CHANGES findings are resolved or explicitly accepted by the human.

## Required evidence
`file:line` for every finding; exact commands run during review with output.

## Stop conditions
- Diff too large to review honestly (> ~500 lines of real change) → request a split instead of skimming.
- Review reveals the spec itself is wrong → stop, surface, don't patch around it.

## Output format
Verdict (APPROVE / APPROVE-WITH-NITS / REQUEST-CHANGES) + severity-ordered findings table + unverified-claims list + what-was-run.

## Memory updates
Recurring failure patterns → `memory/failures.md` (with prevention rule); review conventions that proved useful → `memory/learnings.md`.
