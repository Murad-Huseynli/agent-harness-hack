# Research — read this first

Everything the build rests on. Produced 2026-08-29 before any product code was written,
so the team executes against evidence rather than a hunch.

## Read in this order

| # | Doc | What it settles |
|---|---|---|
| 1 | **[THESIS.md](THESIS.md)** | What we claim, stated as precisely as the evidence allows — and the five things we must **not** claim. **Start here.** |
| 2 | **[NOVELTY-AUDIT.md](NOVELTY-AUDIT.md)** | The five papers closest to our idea, read at full strength. What is already published, and the narrow band that is still ours. |
| 3 | **[FOUNDATIONS.md](FOUNDATIONS.md)** | The full literature review. 164 citations across ML alignment, Bayesian preference elicitation, cognitive science, marketing, economics, market microstructure, and mixed-initiative HCI. |
| 4 | **[IDEATION.md](IDEATION.md)** | 34 candidate ideas, two generic clusters deleted, six ranked with Bit-Flip-Spark. |
| 5 | **[ADVERSARIAL-REVIEW.md](ADVERSARIAL-REVIEW.md)** | Three hostile judges over the top three candidates. Verdicts and demo-failure probabilities. |

## The short version

**The claim.** A production agent harness's human-approval queue is an already-instrumented
preference-elicitation instrument that current systems discard as a boolean. We read it as
structured evidence into a per-user posterior over *attributes of proposed actions*, and use
that posterior to decide the agent's authority over irreversible actions: act, or ask.

**The honest framing** — this sentence, not a stronger one:
> *We operationalize established Bayesian user modeling and value-of-information control on
> a newly important data substrate: the typed approval and correction traces already emitted
> by production agent harnesses.*

**What is already published** (cite it, never claim it):
- RLHF aggregates heterogeneous preferences into an "average user" who is nobody — *Garbacea 2026*, and social choice theory
- Bradley-Terry is not a necessary reward-modelling choice — *Sun et al. 2024*
- User edits are a rich latent-preference signal — *Gao et al., NeurIPS 2024 (PRELUDE/CIPHER)*
- Uncertainty can personalize interaction timing online — *Wang et al. 2026 (EOPA)*
- Ask-vs-act from expected cost and benefit — *Horvitz 1999; Lumière 1998; BusyBody 2004*

**Three corrections the research forced on the design:**
1. **Flip-probability is a UI statistic, not the control law.** It is risk-insensitive. Use
   EVSI weighted by consequence; a 1% chance of preventing an irreversible disclosure beats
   a 40% chance of flipping a formatting choice.
2. **Approval ≠ careful endorsement.** *"Habituation at the Gate"* (2026) measures rising
   approval and declining scrutiny. Model a latent review state `{careful, cursory, unseen}`.
   **A streak of rubber stamps must never expand autonomy.**
3. **Safety is lexicographic, never learned.** Hard rules → mandated approvals → only then
   personal utility. The posterior may only ever *narrow* what the agent does on its own
   authority.

## Method note

Literature discovery used twelve adversarial vocabulary translations — *prior art is missed
because it is indexed under another field's words* — run against arXiv and Semantic
Scholar's Graph API, followed by forward and backward citation walks on the load-bearing
seeds. Sections marked **UNVERIFIED** are exactly that; absence of evidence in twelve
searches is not proof of absence. A gap in our search is a fact about our search, not about
the field.
