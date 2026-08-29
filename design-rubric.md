# Design rubric — visual "done", graded from screenshots

Graded by **vision critics** reading fresh PNGs from `npm run probe` at **desktop
(1512px)** and **mobile (390px)**. A criterion PASSES only if a senior product-design
team would ship it. Done = **all PASS on both critics + human taste sign-off.**

## D1 — No broken layout (hard gate)
- No overlapping or colliding text anywhere (`probe` reports overlaps deterministically).
- No clipped or overflowing text; long labels wrap or resize cleanly.
- Consistent alignment to a grid; nothing visually floating or misplaced.

## D2 — The agent is legible (this IS the Best UI criterion)
- **What it is doing now** — the current step, named in plain language, not a spinner.
- **What it is waiting on** — a pending approval is unmissable and says what will happen.
- **What it did** — a readable trail of completed actions with their results.
- Tool calls, sandbox runs, and subagent work are visible as they happen, not hidden.
- Errors surface as errors, with what failed and what the agent will try next.

## D3 — The irreversible step asks first
- The approval prompt names the exact action and the system it touches.
- Approve and reject are equally reachable; reject is not a hidden secondary.
- After the decision, the outcome is shown — not just dismissed.

## D4 — Typographic system
- Deliberate hierarchy: display / headline / body / mono, with intentional scale,
  weight, tracking. Distinctive, not templated. Readable measure on body.

## D5 — Motion quality
- Purposeful and smooth; respects `prefers-reduced-motion`; no jank or pop-in
  (`probe` reports frame times and CLS).

## D6 — Production polish (anti-AI-slop)
- Spacing rhythm, alignment, color discipline. **No** purple gradients, decorative
  blobs, cards-inside-cards, oversized vague hero copy, generic stock atmospheres.
- Real hover / active / focus states on every control.
- Feels like a funded startup's product, not a generated template.

## D7 — Responsive
- Deliberate at 1512 and 390; no overflow; controls and canvas adapt, don't just shrink.
