# Build handoff — LADDER

**LOCKED 2026-08-29 14:30 PT.** Frozen mapping: [`ladder/MAPPING.md`](ladder/MAPPING.md) @ `ecb639d`.

> **Read [`ladder/MAPPING.md`](ladder/MAPPING.md) first.** It is frozen. Do not edit it.
> Everything below implements it.

## What you are building

An agent that reads TrueForge's approval stream into a per-user posterior over attributes of
proposed actions, and uses that posterior to decide how much to ask about **reversible**
work. It predicts your next approval decision *before you make it*, and can be visibly wrong.

**The demo is the prediction ledger, not the tree.** A moving bar chart proves nothing. A
sealed prediction that resolves right or wrong, scored against a frozen base rate, proves
everything.

## Order of work — do not reorder

### 1 · Deterministic inference replay `⟵ start here, in the sandbox`
The whole product, minus the harness and the UI. If this is not running by **15:05 PT**,
switch to the backup (below).

- Read an append-only JSONL event log; dedupe by event id.
- Extract the seven attributes per `MAPPING.md`. Unknown → widen, never default to 0.
- Gaussian ADF update, diagonal covariance (~150 lines):
  ```
  x̃ = β·x ;  v̂ = Σᵢσᵢ²x̃ᵢ² + ν² ;  z = max(s·(μᵀx̃)/√v̂, −3)
  Λ = φ(z)/Φ(z)
  μᵢ ← μᵢ + s·(σᵢ²x̃ᵢ/√v̂)·Λ
  σᵢ² ← σᵢ² − (σᵢ⁴x̃ᵢ²/v̂)·Λ·(Λ+z)
  ```
- Emit a **sealed prediction** `p̄ = σ(μᵀx̃ / √(1+πv̂/8))` **before** each outcome is read.
- Score rolling log-loss vs the four baselines in `MAPPING.md`.
- **Permutation control**: same log, shuffled mapping, log loss must return to baseline.
- **Test that proves the math**: generate events from a known `w*`, assert the posterior
  recovers it inside its stated intervals. Twenty minutes, and it is what makes the numbers
  defensible.

**Runs in the Daytona sandbox as agent-written code.** This is not decoration — it is why
the numbers are recomputable on stage rather than narrated by a model.

### 2 · Wire the real harness path
TrueForge v0.1.4 is already serving on `:8790`. Verified routes:
```
GET /api/v1/sessions/{id}/events                    full event stream
GET /api/v1/sessions/{id}/turns/{tid}/events
GET /api/v1/sessions/{id}/turns/{tid}/subscribe     live SSE
GET /api/v1/capabilities        → sandbox:true, skill:true
GET /api/v1/catalogs/sandbox-providers → daytona, exec_timeout_ms 60000, auto_stop 5min
GET/PUT /api/v1/settings/{model-providers,sandbox-providers,mcp-servers,skills}
```
Approval lifecycle in the shipped bundle: `require_approval_for_tools`,
`toolApprovalThreadId`, `approve`/`approved`/`pending`/`interrupt`.
Event vocabulary: `TOOL_CALL_START/ARGS/CHUNK/RESULT/END`, `source_event_id`, `tool_call_id`.

- Consume real approval events; persist the posterior **to the same store as the session**,
  with a schema version. **If it lives in process memory the reconnect demo dies** — fix
  this on the first commit, not the last.
- Gate **one** real outward write through the native approval lifecycle.
- **Test the reject path.** Every team forgets it. Rejecting must demonstrably prevent the
  side effect.

### 3 · One registered Generative UI component
TrueForge renders **registered React components** from OpenUI snippets — it does not execute
arbitrary generated frontend code. Build only the judge-facing panel:

- the pending action with its extracted attributes
- **the sealed prediction, shown before the click**
- Allow / Deny, equally reachable
- posterior change with the attribution: *which events moved which attribute, by how much*
- cumulative log loss vs base rate
- the permutation-control result

Then rehearse the whole path **under 75 seconds**.

## Design law
Write `DESIGN.md` **before any markup** — tokens with reasons and measured contrast, one
signature moment, one type scale. Then grade screenshots against
[`design-rubric.md`](design-rubric.md) with two critics: `npm run judge` and a `codex exec`
pass. Convergent findings are the fix list; divergence is a human call.

Deterministic gates are not negotiable: `npm run probe` auto-fails on any console error,
any text overlap, or CLS ≥ 0.05. Animate `transform`, never `width`.

## Binding invariants
1. **Irreversible and policy-mandated actions always ask.** The posterior governs only
   reversible work. It may raise the bar to act alone — never lower it.
2. **Lexicographic:** hard rules → mandated approvals → then personal utility.
3. **A streak of fast approvals must never expand autonomy.**
4. **`ladder/MAPPING.md` is frozen.** Amend only with a new dated section and a full re-run.

## What will kill the demo
| Risk | Mitigation |
|---|---|
| **Collinear attributes** — spend and audience move together, weights unidentifiable, intervals never narrow, *nothing errors* | Compute the design-matrix condition number before demoing; build choice sets to decorrelate |
| Posterior lives in memory → reconnect restores transcript but not beliefs | Persist to the session store on commit #1 |
| Cold start: 3 events into 7 attributes is all-wide, agent asks constantly | Seed a prior session — which doubles as the persistence demo |
| Daytona cold start eats the demo | Create the sandbox before presenting; prove liveness with a fresh nonce command |
| Compaction fires mid-demo and eats the events the attribution points at | Force a compaction in rehearsal; pin belief state + last N events |
| "Isn't the LLM inventing these numbers?" | The sandbox re-run from the event log. Rehearse it. |

## Say this to a technical judge
> "The inference and ask-versus-act mathematics are established Bayesian user-modeling and
> value-of-information ideas. Our contribution is applying them to the typed approval, edit,
> rerun and latency traces a production agent harness already emits."

**Never say:** *"we replace RLHF"* · *"we recovered the user's values"* · *"flip-probability
is a new optimal autonomy law."* Full list with citations: [`research/THESIS.md`](research/THESIS.md).

After one session the honest claim is: **"the model made better sequential predictions than
specified baselines on this session."** Nothing stronger.

## Backup — switch at 15:05 PT if step 1 is not running
**TERMSHIFT**: an approval expires when the web promise behind it changes. Start from the
**covenant-hash execution guard**, not the scraper UI. Bright Data CLI is installed;
signatures in [`scrapers/cli-help-output.md`](scrapers/cli-help-output.md). Never start a
cold heal on stage — Studio's heal can take 15 minutes.

## Still open
- **Deadline**: the official site lists the online track as Aug 24–30, submission Aug 30
  20:00 London. Ours says 18:00 PT today. **Ask an organizer.**
- `DAYTONA_API_KEY` absent — $200 free compute, no card required.
- `OPENAI_API_KEY` not in `.env` yet.
