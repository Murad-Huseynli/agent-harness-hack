# The thesis — stated as precisely as the evidence allows

This is the version that survives [`NOVELTY-AUDIT.md`](NOVELTY-AUDIT.md) and
[`FOUNDATIONS.md`](FOUNDATIONS.md). Anything stronger than what follows is an overclaim
and will be punished by a technical judge.

## The claim

> **A production agent harness's human-approval queue is an already-instrumented
> preference-elicitation instrument that current systems discard as a boolean.**
>
> We read it as structured evidence — *approve · deny · edit-then-approve · choose-among ·
> re-run · interrupt · hesitate* — into a per-user posterior over **attributes of proposed
> actions** (reversible/irreversible · public/private · spend · audience size · provenance ·
> delay cost · scope of affected resources), and use that posterior to decide the agent's
> **authority over irreversible actions**: act, or ask.

The honest novelty sentence, from the literature review:

> *We operationalize established Bayesian user modeling and value-of-information control on
> a newly important data substrate: the typed approval and correction traces already
> emitted by production agent harnesses.*

**That is integration and substrate novelty, not new inference mathematics.** Say it that
way. It is still a strong claim, and it is one we can defend.

## What we do NOT claim

| Overclaim | Why it fails | Source |
|---|---|---|
| "We replace RLHF" | DPO, personalized RLHF, distributional preference learning and multi-objective rewards already modify or remove the canonical reward model. We address online personalization and control, not the training pipeline. | Rafailov et al. 2023; Poddar et al. 2024 |
| "We recover the user's true values from 30 interactions" | IRL rewards and conjoint part-worths are non-unique without variation, anchors and recovery tests. | Ng & Russell 2000; Wilson & Collins 2019 |
| "Our flip-probability rule is a new optimal autonomy law" | It is a risk-insensitive approximation to EVSI that ignores consequence magnitude and interruption cost. | Horvitz 1999; Fleming & Cohen 2001 |
| "We discovered that RLHF averages people away" | Published position paper + social choice theory. | Garbacea 2026 |
| "Learning from user edits is our insight" | PRELUDE/CIPHER, NeurIPS 2024, 96 citations. | Gao et al. 2024 |

## Three corrections the research forced on our design

### 1. Flip-probability is a UI statistic, not the control law
Our rule — *ask when the probability that more information flips the decision is high* — is
a known **expected decision-change** heuristic. It is **not** EVSI, and it is
risk-insensitive:

> "A 40% chance of flipping between two harmless formatting choices can be less valuable
> than a 1% chance of preventing an irreversible disclosure."

**Fix:** ask when `EVSI(q) > C_interruption + C_delay + C_privacy + C_cognitive`. Weight by
consequence. Keep flip-probability as the number shown in the UI because it is
interpretable; do not let it drive control alone.

### 2. Approval ≠ careful endorsement — model whether review actually happened
**"Habituation at the Gate"** (2026) reports **rising approval and declining scrutiny**
across AI-code review episodes. This directly attacks our core assumption.

**Fix:** factor the likelihood over a latent review state:
```
P(y | θ) = Σ_r  P(y | θ, r) · P(r | context, latency, queue load)
           r ∈ {careful, cursory, unseen}
```
Confidence must **fall** when approvals get faster, queues grow, or scrutiny proxies decay.
**A streak of rubber stamps must never expand autonomy.** This is the microstructure
informed-vs-noise-flow distinction, imported.

### 3. Safety is lexicographic, never learned
A posterior over taste must not override rules. The controller is ordered:
1. **Reject** actions violating hard rules or delegated authority
2. **Require approval** for mandated categories
3. **Only then** optimize personal expected utility / EVSI

This prevents repeated unsafe approvals from teaching the agent that a non-waivable rule is
a weak preference. The posterior may **only ever narrow** what the agent does on its own
authority — it can raise the bar to act, never lower it.

## Four more design consequences worth building toward

- **Feature extraction is itself uncertain.** "Public", "reversible", "audience size" are
  model outputs. Propagate `p(φ(a) | proposal)` into the likelihood, and say *"uncertain
  because audience size is unknown"* rather than *"preference uncertain."*
- **Autonomy creates selective labels.** Acting autonomously on easy cases means labels
  survive only for hard ones. Log the probability of asking; keep occasional randomized
  audits among safe autonomous actions.
- **Learn thresholds before semantic values.** 30 events can support *"ask before public
  actions above $50"* but cannot identify whether the value is privacy, reputation or
  frugality. Expose two layers: validated operational thresholds, and explicitly tentative
  value labels.
- **Confidence is a safety-critical actuator.** Confidence → autonomy → fewer questions →
  fewer contradictions → apparent certainty. Cap autonomy growth and distinguish epistemic
  confidence from *"lack of recent contradiction."*

## What we may honestly say after one session

> "The model made better sequential predictions than specified baselines on this session."

Not *"we recovered the user's values."* Not *"the posterior is calibrated"* — 30 events
cannot fill a reliability diagram's bins.

## The validation protocol (minimum credible, n=1, ~30 events)

1. **Freeze the ontology and observation models before collecting outcomes.** Commit the
   event→attribute mapping to git with a hash. *Otherwise the mapping and the inference are
   fitted to the same 30 outcomes — and the demo is numerology with a tree.*
2. **Log exposure**: every offered action, ordering, reversibility, payload, context, and
   the proposal probability. Unoffered alternatives are not rejections.
3. **Rolling prequential prediction**: at event *t* predict *yₜ* from 1:*t*−1 only, record
   log loss, then update. Baselines: global approval base rate · context-only logistic ·
   last-event heuristic · fixed hand-written risk policy.
4. **Synthetic parameter recovery**: simulate users with known weights; check what is
   recoverable from 30 events.
5. **Shuffle controls**: permute outcomes across contexts, permute feature columns, shift
   timestamps. Performance must collapse.
6. **Posterior predictive checks**: approval streaks, edit sparsity, latency tails — not
   just mean accuracy.

## Three sentences for an ML-literate judge

1. *"Canonical RLHF usually fits a point-valued scalar reward from pooled pairwise
   preferences; our deployment-time model instead maintains a per-user posterior over
   interpretable action attributes and updates it from several naturally occurring feedback
   modalities."* — Ouyang et al. 2022; Siththaranjan et al. 2023
2. *"The inference and ask-versus-act mathematics are established Bayesian user-modeling and
   value-of-information ideas; our contribution is applying them to the typed approval,
   edit, rerun, interruption and latency traces emitted by a production agent harness."*
   — Horvitz 1999; Lumière
3. *"The controller asks only when the expected decision benefit of additional information
   exceeds interruption and delay costs, while hard safety and authority rules remain
   outside the learned preference model."* — Attention-Sensitive Alerting; Bai et al. 2022
