# Novelty audit — what is actually new here

**Method.** Twelve vocabulary translations run against arXiv/Semantic Scholar via the
`s2.sh` Graph-API wrapper, then forward/backward citation walks on the load-bearing seeds.
Vocabularies were chosen adversarially — *prior art is missed because it is indexed under
another field's words*. 72 papers surfaced in sweep 1, plus a targeted sweep on the six
angles that decide novelty.

**This document exists to stop us claiming something that is already published.** Every
collision below is real, was read, and is stated at full strength. If we cannot beat these
papers on a specific axis, we do not claim that axis.

---

## The five collisions, ranked by risk

### 🔴 COLLISION 1 — PRELUDE / CIPHER
**"Aligning LLM Agents by Learning Latent Preference from User Edits"** — Gao, Taymanov,
Salinas, Mineiro, Misra. **NeurIPS 2024. 96 citations.** [arXiv:2404.15269](https://arxiv.org/abs/2404.15269)

> "We study interactive learning of LLM-based language agents based on user **edits** made
> to the agent's output… PRELUDE infers a description of the user's latent preference based
> on historic edit data… CIPHER leverages the LLM to infer the user preference for a given
> context based on user edits."

**What it takes from us.** The claim "edit-before-accept is a high-value, naturally
generated preference signal" is **published and well-cited**. We cannot present that as our
insight. It is also evaluated properly — two environments, GPT-4 simulated user, measured
against ground-truth latent preferences.

**What it does not do — and this is where we still stand:**
| | CIPHER | Ours |
|---|---|---|
| Preference representation | A **natural-language description**, used as a prompt | A **structured posterior** over action attributes |
| Uncertainty | None | Explicit per-dimension variance |
| Retrieval/update | k-nearest contexts, aggregate the descriptions | Bayesian update with a stated likelihood |
| **Controls autonomy** | **No** | **Yes — uncertainty gates ask-vs-act** |
| Domain | Writing assistants (summarization, email) | Agent harness — tool calls, approvals, irreversible actions |
| Falsifiable ex-ante prediction | No | Sealed prediction + log-loss vs base rate |

**Verdict: SURVIVABLE, but it forces precision.** Our contribution is not "learn from
edits." It is "represent the result as a calibrated posterior over *action* attributes and
let its uncertainty govern autonomy." Say that, and only that.

### 🔴 COLLISION 2 — EOPA (closest thing to our control law)
**"Preference-Driven Online Adaptation for Personalized Interaction Initiation in Proactive
AI Assistants"** — Wang et al. **2026.** [arXiv:2608.04416](https://arxiv.org/abs/2608.04416)

> "…**uncertainty-guided evidence scaling**, and adaptively fuses the evidence for
> **interaction-or-silence decisions**… updates its evidence carriers and decision
> parameters from received online feedback without LLM-based reasoning or retraining."
> +19.80 F1 on interaction-timing over the strongest baseline.

**What it takes from us.** "Uncertainty-guided, online-updated, personalized decision about
whether to interrupt the human" is **published, with a benchmark and numbers.** Our
ask-vs-act law is not a new idea in the abstract.

**The distinction that survives.** EOPA decides when a *proactive assistant* should
initiate contact from ambient activity context. Ours decides whether an *agent already
mid-task* should execute an **irreversible tool call** on its own authority. Different
object: their decision is about attention, ours is about **authority over consequences**.
That difference is real but it is narrow — do not oversell the control law.

### 🟠 COLLISION 3 — the RLHF-aggregation critique is already a published position
**"Large Language Models Should Learn Personalized Rather Than Aggregated Human
Preferences"** — Garbacea. **2026.** [arXiv:2606.07629](https://arxiv.org/abs/2606.07629)

> "Current approaches… aggregate diverse human preferences into a single reward signal,
> effectively optimizing for a hypothetical *average user* who represents no real person
> particularly well… a limitation both theoretically grounded in **social choice theory**
> and empirically evident across demographic groups."

Plus **"Rethinking Bradley-Terry Models in Preference-Based Reward Modeling"** — Sun, Shen,
Ton. 2024, 46 citations. [arXiv:2411.04991](https://arxiv.org/abs/2411.04991) — establishes
BT's convergence properties *and* argues it is not a necessary modelling choice.

**Verdict: the critique is NOT our contribution.** It is a position paper and a theory
paper. **Never say "we discovered that RLHF averages people away."** Cite Garbacea, agree,
and move on to what we built. This is the single most likely way to lose credibility with
an ML-literate judge.

### 🟢 COLLISION 4 — evidence FOR our substrate hypothesis
**"The Observability Gap: Why Output-Level Human Feedback Fails for LLM Coding Agents"** —
Wang & Wang. **2026.** [arXiv:2603.26942](https://arxiv.org/abs/2603.26942)

> "…a structural **observability gap**: bugs originate in code logic and execution state,
> while human evaluation occurs only at the output layer… **0% full-scene success under
> output-only feedback**… effective human-agent collaboration in such settings requires
> **intermediate observability** beyond output-only evaluation."

This is a *supporting* citation, and a strong one. It demonstrates empirically that
output-level feedback is insufficient and that intermediate signals are needed. Our claim —
that the harness's tool-call approval stream *is* that intermediate observability layer,
already instrumented — sits directly in the gap this paper identifies.

### 🟢 COLLISION 5 — adjacent framing, different mechanism
**"Toward Personal Intelligence Through Cooperative Observation"** — Talebirad et al.
**2026.** [arXiv:2608.17128](https://arxiv.org/abs/2608.17128) — frames the observation
channel as cooperative: usefulness earns access. Single-subject, six-month prototype.
Adjacent, non-competing, and useful for the "why would a user let it watch" argument.

---

## What we may honestly claim

**NOT novel — cite, don't claim:**
1. RLHF aggregates heterogeneous preferences into an average user *(Garbacea 2026; social choice theory)*
2. Bradley-Terry is not a necessary reward-modelling choice *(Sun et al. 2024)*
3. User edits are a rich latent-preference signal *(Gao et al., NeurIPS 2024)*
4. Uncertainty can personalize interaction timing online *(Wang et al. 2026)*

**Defensible as our contribution — the intersection, not any single part:**

> **The human tool-approval queue of a production agent harness is an already-instrumented
> preference-elicitation instrument that current systems discard as a boolean.** We read
> it as structured evidence — *approve, deny, edit-then-approve, choose-among, re-run,
> hesitate* — into a calibrated posterior over **attributes of proposed actions**
> (reversible/irreversible · public/private · spend · audience · provenance · delay cost ·
> scope), and use that posterior's **uncertainty to decide the agent's authority over
> irreversible actions** — act, or ask.

Three properties none of the five collisions has together:
1. **The substrate is the approval gate**, not chat text or ambient activity — it is
   already structured, already logged, already safety-critical.
2. **The posterior is over action attributes**, so it scores an action never seen before,
   rather than retrieving a nearest-context description.
3. **It is falsifiable live** — sealed ex-ante prediction, log-loss against a frozen base
   rate, and a shuffled-mapping permutation control.

**Binding safety invariant** (from the adversarial panel, and it is not negotiable):
the posterior may **only ever narrow** what the agent does on its own authority. It can
raise the bar to act, never lower it, and it can never validate an action a hard rule
would block.

---

## Open risks this audit did not close

- **UNVERIFIED:** whether anyone has published specifically on tool-call approval streams as
  a preference-learning substrate. Twelve vocabularies found nothing, but absence of
  evidence in twelve searches is not proof. *A gap in our search is a fact about our
  search, not about the field.*
- The estate-mining pass (checking Murad's own ResearchOS/IntelligenceOS wikis for prior
  notes on computational rationality, value-of-computation, and `gain-x-need-utility`) was
  **NOT RUN** — the subagent hit a session rate limit. Worth completing: Richard Lewis, a
  targeted thesis advisor, co-authored the computational-rationality framework, and the
  ask-vs-act law may be an instance of value-of-computation metareasoning with an
  established name.
