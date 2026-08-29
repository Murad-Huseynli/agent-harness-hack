# Adversarial review — three hats over three candidates

**Method.** Each candidate was attacked from three positions: a TrueFoundry FDE judging
"Best Use of the Agent Harness" and hunting thin wrappers; a Bright Data pipeline judge;
and a live-demo wrecker trying to make each demo fail on conference Wi-Fi at 18:00.

Verified ground truth was supplied to the panel — TrueForge's real HTTP API surface probed
from the running v0.1.4 instance, the real Bright Data CLI surface, and Qodo's actual
`/agentic_review` requirements — so no verdict rests on a guessed API.

**Estimated probability of a working, non-embarrassing 90-second demo:**
LADDER **65-75%** · TERMSHIFT **40-55%** · REVEAL **20-30%**.

---

# Panel conclusion

With 4h30m, build **LADDER** for the harness track. Keep **TERMSHIFT** as the backup and higher-ceiling concept. Kill **REVEAL** today.

REVEAL combines LADDER’s hardest credibility problem with TERMSHIFT’s hardest integration problem, while weakening both theses. It is the least likely to survive a technical question or a 90-second demo.

## Hat 1 — TrueFoundry FDE

### LADDER

**Load-bearing primitives**

- TrueForge’s session event stream is the evidence source, not incidental telemetry.
- `source_event_id` and `tool_call_id` are required to correlate outcomes with the proposal that caused them.
- Approval, rejection, parameter rerun, and subagent selection events become observations.
- Daytona is useful for replaying the append-only log and recomputing the posterior from scratch.
- Persistent sessions matter if reconnecting produces the same posterior without double-counting events.

**Decorative unless proven**

- A tree visualization is decorative.
- “Gaussian ADF/TrueSkill-family” is decorative if the mapping from an event to an attribute is hand-waved.
- Generative UI adds nothing unless a registered component shows a pending prediction, approval, and updated ledger.
- Subagents are decorative if “subagent pick” is merely another button rather than an actual TrueForge branch.

The inference engine absolutely could be rebuilt on a plain OpenAI loop in an afternoon. The defensible claim is narrower: TrueForge supplies an event-sourced behavioral substrate, durable approval semantics, correlation identifiers, and reproducible sandbox execution that LADDER consumes directly.

**Exposure question**

> Show me one prediction whose evidence came from native harness events, reconnect the session, replay the log in Daytona, and prove the posterior and log-loss remain identical without double-counting.

A good answer exists, but only with deterministic replay, event deduplication, and a predeclared event-to-attribute mapping.

**Verdict: ADAPT STAGING** — The harness is genuinely part of the measurement system, but the demo must prove replay, deduplication, and native approval-event consumption.

### TERMSHIFT

**Load-bearing primitives**

- Human approval is central: an outward action pauses on a concrete covenant hash.
- The sandbox compiles and validates structured invariants.
- Bright Data is a real tool connection producing the terms used by the agent.
- Durable session state matters because an approval and its covenant must survive reconnect.
- The action boundary must compare the current covenant hash with the approved hash immediately before execution.

**Decorative unless proven**

- A red “approval revoked” badge is decorative unless execution is technically blocked.
- “Code Mode compiles invariants” is decorative if it just asks a model for JSON.
- Semantic-delta prose is decorative if the actual guard hashes raw page text or volatile markup.
- Approval expiration is application logic, not a native TrueForge capability. Do not imply otherwise.

Most of this could also run on a normal tool loop. Its harness case rests on approval lifecycle, sandbox validation, persistent session state, and execution-bound enforcement working together.

**Exposure question**

> I approved version A, the page changes to version B, the UI disconnects, and the agent retries the write. Where exactly is the stale approval rejected?

A good answer exists: canonicalize the extracted covenant, store the approved hash in durable session state, and enforce equality inside the tool-execution guard. A UI-only answer fails.

**Verdict: SHIP** — This is a clean approval-and-tool thesis if stale authorization is rejected at the execution boundary rather than merely relabeled in the UI.

### REVEAL

**Load-bearing primitives**

- It consumes approval and denial events.
- Its eventual public write needs a real approval gate.
- Live events can update the displayed model.

**Decorative or weak**

- The behavior-dial tree is currently a preference cache with Bayesian vocabulary.
- A single denial does not identify whether the cause was irreversibility, source distrust, price, tone, or the specific wording.
- Updating two selected dials after a denial is post hoc storytelling unless the proposed action had predeclared features and a likelihood model.
- The scrape-and-heal carrier is separable from the preference updater.
- It would survive almost unchanged on a plain OpenAI loop.

**Exposure question**

> Before I answer, predict whether I will approve a previously unseen action. Then show why that outcome updates irreversibility rather than source trust.

No good answer currently exists. The proposed update is underidentified.

**Verdict: DO NOT SHIP TODAY** — It presents an attractive UI around an inference claim that the current model cannot defend.

---

## Hat 2 — Bright Data pipeline judge

### LADDER

- Bright Data is absent.
- There is no version-controlled scraper configuration.
- There is no fresh structured data, drift detector, repair loop, or downstream consumption.
- Adding a scrape solely to qualify would be obvious sponsor paint.

**Verdict: DO NOT SHIP TODAY** — Do not enter LADDER in the Bright Data track.

### TERMSHIFT

Bright Data is inside the product’s causal loop:

```text
fresh scrape
  → structured covenant
  → invariant validation
  → canonical hash
  → approval scope
  → later scrape
  → semantic drift
  → stale approval revoked
  → repair draft
  → validate
  → human promotion
  → re-run
```

To qualify:

- Every target must be in `scrapers/registry.json`.
- Store typed snapshots in the application’s own data store.
- Hash canonical semantic fields, not HTML or arbitrary prose.
- Record exact CLI commands, revision, fixture, verification results, and drift log.
- A failed invariant must capture the failing fixture automatically.
- The agent must invoke repair, validate the draft, request approval, promote it, and rerun.
- The repaired extraction must feed the new covenant. A fixture consumed only by the demo UI loses.

Because healing can take 15 minutes, start it before the demo and preserve the full timestamped event trail. On stage, resume at returned-draft validation and approval. Do not pretend a warm result was generated in 90 seconds.

**Verdict: SHIP** — It is the only candidate whose central product guarantee directly depends on fresh Bright Data and a genuine drift-repair pipeline.

### REVEAL

- Fresh rows can be structured and consumed, so the data is not inherently decorative.
- A manually broken field followed by pressing Heal is still theatre.
- The preference update neither improves nor validates the extraction repair.
- The public-write proposal could be generated from a fixture or ordinary fetch without changing the central experience.
- Trying to demonstrate scraping, drift, repair, preference inference, denial, revised action, approval, and a real write in 90 seconds guarantees superficial treatment.

Do not enter REVEAL in this track unless the complete supervised repair loop already works independently. With the stated clock, it will not.

**Verdict: DO NOT SHIP TODAY** — Bright Data is a crowded carrier rather than a necessary part of REVEAL’s thesis, and its repair loop will be the first thing reduced to theatre.

---

## Hat 3 — live-demo wrecker

Assuming work starts around 13:30 PT, code should freeze by 16:30 and the final hour should be reserved for deployment, Qodo evidence, rehearsal, recording, and submission.

### LADDER

**Most likely killer:** live event ingestion double-counts replayed or reconnected events, visibly moving the posterior twice.

**Second most likely:** there are too few meaningful live observations for the posterior, calibration ledger, or permutation control to show anything intelligible.

**The overlooked killer:** the event-to-attribute mapping was selected after seeing outcomes. The judge calls the entire experiment unfalsifiable.

**Build and rehearse first**

A deterministic replay containing duplicate, reordered, approved, denied, and rerun events. It must produce byte-identical posterior and ledger outputs on every run.

**Cutoffs**

- **14:20:** ingestion, correlation, and deduplication must work. Otherwise stage from a checked-in append-only log and stop attempting live SSE ingestion.
- **15:05:** sealed prediction and posterior update must work. Otherwise abandon LADDER rather than replacing it with animated integer counters.
- **15:35:** base-rate and shuffled-mapping ledgers must compute. If the live permutation UI is unfinished, show the recomputed result in the same registered component.
- **16:00:** one approved real-system write must execute. If it does not, the project fails the repository’s definition of an agent.
- **16:30:** freeze.

**Verdict: ADAPT STAGING** — Use live approval for the final observation and write, but keep deterministic event replay as the stage-safe evidence path.

### TERMSHIFT

**Most likely killer:** conference Wi-Fi or Bright Data latency prevents the second scrape or repair result from arriving.

**Second most likely:** normalization changes the covenant hash for whitespace, ordering, timestamps, or unrelated content, creating a false revocation.

**The overlooked killer:** the extractor misses the changed clause, so the hash remains stable and an actually stale approval stays valid. This is worse than a false alarm.

**Build and rehearse first**

Two deterministic typed snapshots and the execution guard:

1. Snapshot A is approved.
2. Snapshot B has one relevant semantic change.
3. The old approval cannot authorize the action.
4. Unrelated markup changes do not alter the hash.

**Cutoffs**

- **14:15:** canonical covenant hashing and the stale-approval execution guard must pass tests. If not, abandon TERMSHIFT.
- **15:00:** one Bright Data target must produce structured data consumed by the hash path. Otherwise use the concept only as a harness demo and do not enter the Bright Data track.
- **15:45:** detect → fixture → repair draft → validate → approve → promote → rerun must work. Otherwise stop claiming self-repair.
- **16:00:** no new cold Studio heal jobs. Preserve a returned draft and timestamped run for the stage fallback.
- **16:30:** freeze.

**Verdict: ADAPT STAGING** — The semantic guard can be live, but the network and long-running repair steps require a warm, auditable fallback.

### REVEAL

**Most likely killer:** the 90 seconds expire before the audience understands how scraping, healing, preference inference, denial, revised action, and approval relate.

**Second most likely:** one denial produces an arbitrary dial update, and a technical judge immediately asks why another dial did not move.

**The overlooked killer:** “smaller action” is hand-authored after denial, making the preference model causally irrelevant. The model could be removed without changing the demo.

**Build and rehearse first**

A paper-scripted 90-second causal story. If every transition cannot be explained in one sentence, the product is already too large.

**Cutoffs**

- **14:00:** freeze the action-feature schema and likelihood mapping. Do not keep tuning dial names.
- **14:45:** blind prediction → denial → defensible update → changed action policy must work. If not, abandon REVEAL.
- **15:15:** the complete Bright Data repair loop must work independently. If not, remove the Bright Data-track claim.
- **15:45:** full demo must finish in under 75 seconds during rehearsal. If not, switch candidates; trimming animations will not fix the thesis collision.

**Verdict: DO NOT SHIP TODAY** — Its failure modes are conceptual and narrative, not merely implementation risk.

---

# Answers to the six specific questions

## 1. REVEAL’s tree shape

Yes. In its current form, REVEAL collapses into a preference cache with a polished tree.

A behavior dial such as `risk-tolerance = low` is already a compressed conclusion. Updating it directly from a denial skips the inference problem. It cannot score an unseen option unless another model informally translates that option into the dial, at which point the actual intelligence lives in an untested prompt.

LADDER’s shape survives transfer better because fresh objects have observable attributes. The posterior scores attributes, not identities.

The strongest shape is slightly broader than LADDER’s product attributes: use **features of proposed actions**.

Examples:

- public versus private;
- reversible versus irreversible;
- estimated spend;
- audience size;
- source provenance;
- confidence;
- delay cost;
- scope of affected resources.

Values and consequences can remain higher-level explanatory nodes. The posterior should operate over observable action or object attributes. `tone` and `goal` should be explicit settings, not inferred preference dimensions unless there is a defensible observation model.

**Winning shape:** LADDER’s values → consequences → attributes structure, with attributes attached to proposed actions as well as scraped options.

## 2. Falsifiability

The omission hurts REVEAL severely. Without an ex-ante prediction or baseline, every update can be chosen to make the visualization look sensible after the fact.

Adding the complete kit does not rescue REVEAL because its observation model remains underidentified. It would produce precise metrics for an arbitrary mapping.

For LADDER, the minimum credible kit is worth roughly 45–60 implementation minutes:

- write the probability before the approval event;
- append outcome and log-loss;
- compare with a frozen base-rate predictor;
- replay the same log using a predeclared shuffled mapping.

Do not spend time building a fancy live permutation animation. One deterministic recomputation and a visible result are enough. Freeze the mapping before collecting stage outcomes.

## 3. Carrier-task saturation

Yes. “Watch a page, collect evidence, rank it, recommend something, then ask before posting” is saturated.

REVEAL’s denial interpretation is not yet strong enough to differentiate it. The audience will remember another monitored feed with an approval button.

TERMSHIFT escapes the archetype because the scrape changes the validity of a previously granted authorization. That is a state transition with a safety consequence, not another recommendation.

LADDER escapes it because its object of study is the harness user’s latent decision model rather than the scraped content.

## 4. The merge question

TERMSHIFT is a better long-term carrier for LADDER than a generic watchlist, but merging them today is a mistake.

The clean long-term composition is:

```text
covenant drift
  → stale approval always revoked deterministically
  → LADDER estimates whether the new drift deserves interruption
  → human receives an alert, digest, or autonomous low-risk handling
```

The posterior must never decide whether a stale approval remains valid. Revocation is a hard invariant; preference inference can only prioritize what happens afterward.

In a 20-second explanation, the merged thesis becomes: “a learned posterior estimates whether changed contractual terms that already invalidated approval should interrupt you.” That requires explaining two state machines, two forms of uncertainty, and their safety boundary. With one implementer and 4h30m, do not merge.

## 5. Scope

Rough planning estimates, assuming no substantial candidate implementation already exists:

| Candidate | Working, non-embarrassing 90s demo | Highest-value failure risk |
|---|---:|---|
| LADDER | 65–75% | Arbitrary mapping or bad event replay |
| TERMSHIFT | 40–55% | Network/repair latency and extraction correctness |
| REVEAL | 20–30% | Thesis incoherence and narrative overload |

**Highest probability today:** LADDER.

**Highest ceiling:** TERMSHIFT. It has a sharper product guarantee, honest Bright Data dependence, an execution-bound approval story, and credible eligibility for two major tracks.

**Worst risk-adjusted choice:** REVEAL.

## 6. Track strategy

Design for the harness track alone. Accept only secondary-track evidence that falls out naturally.

For LADDER:

- Spend roughly **70%** on the harness-native causal spine: events, replay, approval, sandbox recomputation, real write.
- Spend **20%** on staging reliability and the registered UI component.
- Spend **10%** on Qodo evidence, deployment, submission, and recording.
- Enter Harness, UI, and Code Quality.
- Do not enter Bright Data.

For TERMSHIFT, Bright Data is a byproduct of the thesis, but the complete pipeline adds approximately 90–120 minutes and multiple correlated failure points. Its wider track coverage is real, but its demo reliability is roughly 20 percentage points lower.

Entering tracks is free. Building unrelated eligibility is not. One undeniable harness entry is better than three visibly partial entries.

# Final panel recommendation

## Winner: LADDER

It has the best probability of working by 18:00 and the strongest claim that native harness events are the product’s raw material.

## Backup: TERMSHIFT

Switch only if LADDER cannot produce a deterministic sealed prediction and posterior update by **15:05 PT**. TERMSHIFT should start with the covenant-hash execution guard, not the scraper UI.

## First three build steps

1. **Build deterministic inference replay.** Ingest an append-only fixture, deduplicate by event identity, correlate tool calls with approvals, emit a sealed prediction, update the posterior, and compute base-rate plus shuffled-mapping log-loss inside Daytona.

2. **Wire the real harness path.** Consume a TrueForge session’s approval events, persist the evidence log, survive reconnect, and gate one actual outward write through the native approval lifecycle.

3. **Build only the judge-facing registered component.** Show the pending prediction, proposed action attributes, Allow/Deny state, posterior change, cumulative loss, permutation control, and final tool result. Then rehearse the path under 75 seconds.

## Single thing most likely to sink it

The judge concludes that the event-to-attribute mapping was chosen after observing the outcome. Freeze and version the mapping before the demo; otherwise LADDER is numerology with a tree.

No repository files were changed. Tests and live verification were not run because this was an adversarial design review, not an implementation request.
