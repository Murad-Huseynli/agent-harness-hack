---
name: debugging
description: Systematic debugging discipline for any bug, crash, failing test, or "it works sometimes" flake. Reproduce deterministically → isolate → root-cause with evidence → write a failing regression test FIRST → minimal fix → verify nothing else broke. Use whenever behavior is wrong and you don't yet know why.
---

# Debugging

## Purpose
Replace guess-and-poke debugging with evidence. Fix the cause, not the symptom; prove the fix with a test that failed before it and passes after; confirm nothing else regressed.

## When to use
- A bug report, crash, exception, wrong output, or failing/flaky test.
- "It works on my machine," intermittent failures, or behavior that changed unexpectedly.
- NOT a duplicate of: `tdd-cycle` (writing new behavior test-first) or `run-and-verify` (the completion ladder). This skill is the *investigation* in front of them — it hands off to `tdd-cycle` for the regression test and `run-and-verify` for the final ladder.

## Inputs
- A concrete failure: the report, stack trace, failing command, or repro steps.
- The project's test runner (if none exists yet, see Stop conditions).
- `memory/failures.md` — check whether this failure (or its cause) is already recorded.

## Procedure
1. **Reproduce deterministically.** Get a single command or set of steps that fails every time. If it's intermittent, find the trigger (ordering, timing, data, environment, concurrency) until it's reliable. **A bug you can't reproduce, you can't claim to have fixed.** Capture the exact failing output.
2. **Isolate.** Shrink the failure to the smallest input/code path that still reproduces it — bisect the data, the commits (`git bisect`), or the code path. Cut everything irrelevant until what remains is a minimal repro that points at one region.
3. **Root-cause with evidence — cause vs symptom.** Form a hypothesis, then prove or kill it with an observation (a log, a value, a breakpoint, a diff), not a hunch. Keep asking "why does that happen?" until you reach the actual cause. State it in one sentence: *the bug is X because Y, evidenced by Z.* Do not fix anything until this sentence is true and backed by evidence.
4. **Write a failing regression test FIRST.** Encode the bug as the smallest test that fails for the right reason. Run it; paste the red output. This is the `tdd-cycle` red step — invoke that skill's discipline. If you can't write a test that fails, you haven't pinned the cause yet — return to step 3.
5. **Minimal fix.** Change the least code that makes the cause go away. No drive-by refactors, no fixing adjacent things the bug didn't touch. Every changed line traces to the root cause. Run the regression test; paste the green output.
6. **Verify nothing else broke.** Run the full relevant suite and the verification ladder via `run-and-verify` — not just the new test. A fix that breaks two other things is not a fix.
7. **Close the loop.** Confirm the original reproduction from step 1 now passes.

## Outputs
- A one-sentence evidenced root cause (cause, not symptom).
- A regression test that was red before the fix and green after (with both outputs shown).
- A minimal diff, plus full-suite/ladder evidence that nothing else regressed.

## Stop conditions
- Can't reproduce after a genuine effort → stop; report what you tried and ask for more context/repro detail rather than fixing blind.
- Root cause stays unproven (only correlation, no mechanism) → say so; don't ship a speculative fix as a confirmed one.
- No test runner exists yet (`AGENTS.md` table = TODO) → reproduce and root-cause anyway, fix minimally, and report the regression test as **NOT RUN (no runner)**; propose test setup as its own slice. Never simulate test results.
- Two failed fix attempts on the same cause → stop and reassess the hypothesis or ask for input; don't try a third blind change.

## Memory updates
- Real root causes → `memory/failures.md` (date, the failure, the evidenced cause, the fix, status).
- Reusable debugging facts (a flake trigger, a tricky reproduction setup, a runner quirk) → `memory/learnings.md` via `verify/evidence.md`.
