---
name: tdd-cycle
description: Red-green-refactor test-driven development loop. Use when implementing behavior with testable outcomes — new functions, bug fixes (regression test first), API handlers. Not for pure scaffolding or docs.
---

# TDD Cycle

## Purpose
Tests define done. A test that has never failed proves nothing.

## Workflow
1. **Red**: write the smallest test expressing the next required behavior. Run it. **It must fail** — paste the failure output. If it passes immediately, the test is wrong or the behavior exists; investigate before proceeding.
2. **Green**: write the minimum code to pass. No extra features, no speculative handling. Run the test; paste the passing output.
3. **Refactor**: only with green tests; behavior-preserving only; re-run tests after; paste output.
4. Repeat per behavior. Bug fixes always start at step 1 with a failing reproduction test.
5. Finish with the full relevant suite, not just the new tests.

## Required evidence
Real command output for every red and green claim. "Tests pass" without pasted output is a violation of `.claude/rules/00-safety.md`.

## Stop conditions
- No test runner exists yet (`AGENTS.md` command table says TODO) → stop; say TDD is not yet possible; propose the minimal test setup as its own approved slice. **Do not simulate test results.**
- A test needs heavy mocking of things you don't understand → stop and ask; that's a design smell.

## Output format
Per cycle: test name → red output (trimmed) → change made → green output (trimmed). Final: full-suite result.

## Memory updates
Testing conventions discovered (runner quirks, fixture patterns) → `memory/learnings.md`.
