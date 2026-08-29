---
name: implementation-plan
description: Break an approved spec into small verifiable implementation slices. Use after a spec exists and before writing code; also for planning refactors or multi-step technical work.
---

# Implementation Plan

## Purpose
Convert an approved spec into slices small enough that each one is independently verifiable and reviewable.

## Workflow
1. Confirm `brief.md` and `rubric.md` state the goal and its PASS/FAIL criteria (no spec gate here — this is a one-day build).
2. Delegate design questions to the `planner` subagent if architecture is non-obvious.
3. Produce a staged plan:
   - Each slice: ≤ ~1 hour of work, one concern, ends with `verify:` (exact command or observable check).
   - Slice 1 or 2 must attack the riskiest assumption.
   - Map each slice to the acceptance criteria it advances.
4. Identify what each slice must NOT touch (blast-radius control).
5. Present plan; get approval; then execute slice-by-slice, running each `verify:` before moving on.

## Required evidence
Spec reference; per-slice verify steps that are real commands/checks, never invented.

## Stop conditions
- A slice fails verification twice → stop, run the `debugging` skill thinking (reproduce → hypothesize → cheapest test), or surface to the human. Do not pile fixes on unverified fixes.
- Plan grows past ~10 slices → scope is too big; propose a cut.

## Output format
Numbered slice table: `# | change | files touched | verify | criteria advanced`.

## Memory updates
After execution: `verify/evidence.md`. Plan-level decisions that will outlive the task → `memory/decisions.md`.
