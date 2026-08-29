# Ideation — 34 ideas, two clusters deleted, six ranked

**Method.** 24 ideas generated across 16 non-devtools domains plus 4 infrastructural → the
two largest *generic* clusters deleted outright (15 of 24 ideas) → 10 new ideas generated
that could not belong to either → Bit-Flip-Spark on the strongest 6 → inversion pre-mortem
→ ranked.

The two deleted clusters, and why:
- **Evidence funnels** (8 ideas) — *gather heterogeneous evidence → fan out analysis → score
  options → recommend or execute one.* "Changing the nouns turns each into the same
  research-and-ranking agent."
- **Approval-gated workflow concierges** (7 ideas) — *assemble a checklist → wait for missing
  facts or credentials → ask approval → complete an external workflow.* "The harness mainly
  supplies connectivity and gates. The product remains a competent assistant that does
  paperwork."

A do-not-build blocklist was enforced from the crowded-map research: security auditor,
claim red-teamer, decision-brief generator, codebase onboarding, CI fixer, text-to-SQL,
issue triager, incident investigator, knowledge capture, generic research desk,
approval-gated email/ticket/trip booker, Airlock, Verdict. Zero leaked into the output.

See [`DECISION.md`](DECISION.md) for the adversarial panel's verdict on the top three.

---

# 1. Wide generation — 24 ideas

Track shorthand: **Harness**, **Bright**, **UI**, **Qodo**, **Blog**. Qodo remains available to every build through real reviewed PRs; it is listed only where a generated/config PR is part of the product story.

| # | Candidate | Pitch · domain | Tracks | Load-bearing TrueForge primitives | Live demo beat | Irreversible action | 4.5h |
|---:|---|---|---|---|---|---|---|
| 1 | **ALIQUOT** | A lab handoff agent refuses the next sample transfer until protocol, remaining volume, and downstream assays reconcile. · Science/lab | Harness, UI, Blog | Sandbox + Code Mode calculate volumes; Git-backed protocol skill; clarification card for ambiguous labels; session persistence across handoff; approval on LIMS write | Change one tube label mid-run; agent catches the mismatch, asks one structured question, recalculates, then prepares the transfer | Append a transfer to the LIMS/sample ledger | MED |
| 2 | **BEDSWAP** | Replans hospital bed moves when isolation, staffing, and equipment constraints collide. · Healthcare ops | Harness, UI | Dynamic subagents for nursing/infection-control/transport; sandbox constraint solver; clarification cards; approval; persisted session | A bed becomes unavailable; three subagents replan while the UI shows blocked dependencies | Dispatch transport and change the bed board | MED |
| 3 | **CLAUSECLOCK** | Watches a public rule change and identifies which active contract clause has become time-sensitive. · Law/compliance | Harness, Bright, Qodo, Blog | Bright Data MCP; Code Mode extraction; sandboxed rule comparison; large-result offload; approval; skill containing jurisdiction rules | Mutate a target page fixture; verification fails, the agent repairs extraction, then opens a clause-update PR | Open a real contract-template PR | MED |
| 4 | **HEDGEHOG** | Parallel market agents argue whether an existing position has crossed its predeclared hedge threshold. · Finance | Harness, UI | Dynamic subagents; deferred market tools; Code Mode calculations; clarification card; approval; persistent position session | Inject a price shock; the disagreement collapses into one proposed paper hedge | Submit a paper-market hedge order | LOW |
| 5 | **COLD JURY** | Adjudicates whether a temperature-exposed shipment should be released, inspected, or quarantined. · Logistics | Harness, Bright, UI | Bright Data for carrier/weather pages; sensor MCP; Code Mode excursion calculation; dynamic subagents; approval | Carrier ETA changes while the sensor file stays constant; the disposition changes visibly | Quarantine or release the shipment record | MED |
| 6 | **PERMIT PALIMPSEST** | Navigates contradictory city permit pages and produces a submission that records which interpretation it relied on. · Civic/government | Harness, Bright, UI, Blog | Bright Data with drift repair; Code Mode comparison; large-result offload; clarification cards; approval; session persistence | Two city pages disagree; the agent pauses for one applicant fact and resolves the path | Submit the permit application | LOW |
| 7 | **WRONG ANSWER ENGINE** | Treats a student’s wrong answer as an executable mental model, then designs the smallest question that distinguishes it from competing misconceptions. · Education | Harness, UI, Blog | Dynamic misconception subagents; sandboxed simulations; clarification cards as the assessment instrument; persistent learner session; generative UI | Student chooses the same wrong answer twice; the agent asks a non-obvious discriminator and visibly switches its diagnosis | Commit the assessment outcome to the gradebook | HIGH |
| 8 | **SPRAY WINDOW** | Converts live pest reports, label restrictions, and weather into a field-specific treatment window. · Agriculture | Harness, Bright, UI | Bright Data with registry and repair; field/weather MCPs; Code Mode; sandboxed schedule solver; approval | A label-page field drifts, repair runs, and the permitted window moves | Create a spray work order | MED |
| 9 | **ANDON COUNCIL** | A manufacturing agent convenes independent safety, quality, and throughput agents before deciding whether a line may restart. · Manufacturing | Harness, UI, Blog | Dynamic subagents; sandboxed process simulation; clarification card for operator observations; approval; session persistence | Throughput votes “run,” safety votes “stop”; one operator answer flips the final state | Send stop/restart to a simulated PLC/andon board | MED |
| 10 | **EMBARGO** | Holds publication assets until every source-specific embargo and attribution condition is satisfied. · Media/journalism | Harness, UI | Session persistence; OAuth MCP connection mid-turn; clarification cards; sandboxed metadata checks; approval | Connect a source account during the paused turn; agent resumes and unlocks publication | Publish the article/package | HIGH |
| 11 | **CONCESSION GHOST** | Infers hidden seller concessions from listing edits, days-on-market changes, and comparable transactions. · Real estate | Harness, Bright, UI | Bright Data; Code Mode; large-result offload; subagents for alternative explanations; approval | Listing changes between two fetches; agent repairs drift and changes offer terms | Send a signed offer | MED |
| 12 | **FLEXLOAD** | Negotiates which building loads should pause when electricity price or grid intensity spikes. · Energy | Harness, UI | Live grid MCP; deferred building-control tools; sandbox optimizer; clarification cards; approval; persistence | Price spike arrives; agent offers three discomfort/cost tradeoffs and resumes from selection | Issue a building-control command | LOW |
| 13 | **LAST MILE VOTE** | Allocates relief deliveries under road, shelf-life, and beneficiary constraints instead of using first-come-first-served. · Disaster response | Harness, Bright, UI, Blog | Bright Data for roads/shelters; dynamic stakeholder subagents; sandbox optimizer; approval | A bridge closes; allocation re-solves and exposes who loses service | Dispatch the relief manifest | MED |
| 14 | **BLIND LADDER** | Separates résumé evidence from identity and makes competing hiring agents state which evidence would change their recommendation. · Hiring | Harness, UI | Dynamic subagents; sandboxed redaction; large-result offload; clarification card; approval | Reveal identity only after evidence scoring; UI shows whether any evaluator moved | Send an interview invitation/rejection | HIGH |
| 15 | **CUT ROOM** | Three isolated editor agents make genuinely different cuts; the human directs by selecting moments, not by rewriting prompts. · Creative production | Harness, UI, Blog | Dynamic subagents; Daytona sandbox; Code Mode/FFmpeg; large-result offload; clarification cards; generative UI; approval | Three cuts arrive in parallel; one clip choice triggers a new composite render | Publish the selected cut | MED |
| 16 | **AFTERCARE** | Coordinates account closures, beneficiary notices, and data transfers after death or incapacity without treating one approval as blanket consent. · Personal admin | Harness, UI, Blog | Persistent sessions; OAuth connection mid-turn; deferred tools; per-action approval; clarification cards; skills for account procedures | Approve one closure and deny another; agent preserves the remaining plan across reconnect | Close an account or send a beneficiary notice | MED |
| 17 | **LADDER** | *“Use psychological techniques from marketing like unrevealed intent and using the interaction data between the human-AI system, some Bayesian tree like inferences, being able to infer unrevealed human preferences and intent, and use that data dynamically to better have human-AI alignment, to basically replace very simplistic modeling of human preferences with just binary averaging of RLHF.”* · Agent alignment/infrastructure | Harness, UI, Blog | Three-layer means-end tree; Gaussian ADF/TrueSkill-family posterior; harness event stream; structured choices; approvals; subagent selection events; session persistence; compaction | User rejects the nominally preferred option, edits another, and approves it; the posterior moves and the next ask/act boundary changes | Execute the next outward action under the learned policy | MED |
| 18 | **TOOLIPO** | Subagents bid for scarce tool calls and context instead of receiving an unlimited, centrally assigned budget. · Agent economics/infrastructure | Harness, UI, Blog | Dynamic subagents; deferred tool loading; isolated contexts; spans/timings; Code Mode auction; clarification card for budget; approval | Four agents bid; the cheapest is rejected because its uncertainty-adjusted value is worse; only the winner receives the tool | Fund the winning tool plan and publish its result | HIGH |
| 19 | **MANDATE** | An agent can stop work and renegotiate when the requested task drifts beyond the mandate originally approved. · Harness governance/infrastructure | Harness, UI, Blog | Persistent event hierarchy; clarification cards; per-tool approval; skills; dynamic subagents with isolated mandates; compaction | Mid-run instruction broadens “draft” into “send”; the worker refuses, shows the mandate delta, then resumes after a scoped choice | Amend the mandate and execute the newly authorized action | HIGH |
| 20 | **CONNECTIVE TISSUE** | Starts a multi-service job with no credentials in the sandbox and acquires only the connections actually needed. · Harness infrastructure | Harness, UI | OAuth MCP pause/resume; deferred tool loading; server-held credentials; persistent session; approvals | Agent reaches a protected tool, surfaces Connect, resumes the same turn, and completes the workflow | Write to the newly connected service | MED |
| 21 | **LAB BET** | Experiment agents wager limited compute on predictions before the sandbox runs the experiment. · Science/infrastructure | Harness, UI, Blog | Dynamic subagents; sandbox/Code Mode; budget card; large-result offload; session persistence; approval | Agents publish predictions, code runs, calibration determines who receives the next compute tranche | Commit the winning protocol to a lab queue | HIGH |
| 22 | **RECALL SEAL** | Computes the narrowest defensible product-recall boundary from supplier lots, public notices, and factory genealogy. · Manufacturing/supply chain | Harness, Bright, UI | Bright Data; graph computation in Code Mode; large-result offload; dynamic subagents; approval | One supplier-lot link changes; the proposed recall boundary expands on screen | Quarantine all affected SKUs | MED |
| 23 | **TENANT CHORUS** | Combines independently verified repair failures into a collective demand without exposing tenants’ private records to one another. · Real estate/civic | Harness, Bright, UI | Isolated subagents; sandbox redaction; Bright Data code/inspection pages; clarification cards; persistence; approval | Three private cases produce one aggregate claim; each tenant separately approves inclusion | Send the collective notice | MED |
| 24 | **FUNERAL RADIO** | Builds messages that may be released only under explicit future conditions, with recipients and exclusions negotiated separately. · Personal/creative | Harness, UI, Blog | Persistent sessions; clarification cards; isolated recipient subagents; sandboxed media generation; per-message approval | User denies one recipient, edits a trigger, and arms only a single message | Arm a future message for delivery | MED |

# 2. Cluster and delete

## Deleted cluster 1: evidence funnels

**8 ideas deleted:** CLAUSECLOCK, HEDGEHOG, COLD JURY, SPRAY WINDOW, CONCESSION GHOST, LAST MILE VOTE, BLIND LADDER, RECALL SEAL.

Shared pattern:

> Gather heterogeneous evidence → fan out analysis → score options → recommend or execute one choice.

Why generic: changing the nouns turns each into the same research-and-ranking agent. Bright Data, subagents, and a chart improve the implementation but do not alter the thesis. A judge could reasonably call them domain skins over a decision brief.

## Deleted cluster 2: approval-gated workflow concierges

**7 ideas deleted:** BEDSWAP, PERMIT PALIMPSEST, EMBARGO, FLEXLOAD, AFTERCARE, CONNECTIVE TISSUE, TENANT CHORUS.

Shared pattern:

> Assemble a checklist → wait for missing facts or credentials → ask approval → complete an external workflow.

Why generic: TrueForge makes these pleasant, but the harness mainly supplies connectivity and gates. The product remains “a competent assistant that does paperwork.” OAuth pause/resume and approvals are visible, but not a new agent behavior.

## Surviving space

ALIQUOT, WRONG ANSWER ENGINE, ANDON COUNCIL, CUT ROOM, **LADDER**, TOOLIPO, MANDATE, LAB BET, FUNERAL RADIO.

These survive because their central mechanism is respectively protocol invariance, executable misconception modeling, structured dissent, human direction through variants, learned alignment, tool economics, negotiated authority, prediction-backed compute allocation, or conditional future agency.

# 3. Ten ideas outside both deleted clusters

| # | Candidate | Concrete mechanism | Why it is not generic |
|---:|---|---|---|
| 25 | **CONSENT EXAM** | A clinical-trial agent teaches one concept at a time, then uses selectable counterfactual questions to test comprehension. Misunderstanding branches into a new explanation. Enrollment remains locked until required concepts are demonstrated; a human approves the final append-only enrollment write. | The output is not advice or completed paperwork. The interaction itself produces the consent evidence. Clarification cards become a measurement instrument. |
| 26 | **TERMSHIFT** | Bright Data continuously extracts price, cancellation, delivery, and refund promises from a merchant page. Code Mode compiles them into executable invariants. On semantic drift, the agent repairs extraction, shows the changed promise, and freezes purchase approval. | It does not recommend what to buy. It converts unstable web prose into a covenant that can block action. Drift is the product event, not scraper maintenance. |
| 27 | **KILL-SWITCH PARLIAMENT** | Every irreversible action is reviewed by isolated “affected party,” “operator,” and “future maintainer” subagents. Each has a narrow veto condition; one veto forces a structured human ruling before the original turn resumes. | This institutionalizes minority veto rather than aggregating evidence into a majority recommendation. |
| 28 | **CONTEXT IPO** | Before a long job, subagents issue bids for context slots: what event they need retained, how much it costs, and what failure it prevents. A sandbox auction selects the context portfolio under a token budget. | Context is treated as scarce capital. The product operates on agent cognition, not on an external workflow. |
| 29 | **MISTAKE MARKET** | Student misconception agents stake confidence on the learner’s next answer. The winning misconception receives question-generation budget; repeated overconfidence bankrupts it. | Wrong models compete through falsifiable predictions. It is neither tutoring advice nor grade automation. |
| 30 | **WITNESS CHAIN** | A media asset cannot publish until every represented person has supplied a consent token or the editor explicitly records a public-interest override. OAuth connections can arrive mid-turn; each decision is separately persisted. | It makes multiparty consent—not the editor’s approval—the executable dependency graph. |
| 31 | **FUTURE-SELF ESCROW** | A present-self agent and a deliberately conservative future-self agent negotiate conditions for releasing money, messages, or data. Neither can execute alone; changed conditions reopen the bargain. | The agent models temporal conflict inside one person rather than optimizing a present request. |
| 32 | **REHEARSAL CAN REFUSE** | Isolated AI performers receive boundary cards before improvising a scene. A performer may refuse or propose a safe rewrite; the sandbox renders only a unanimously permissible take. | Refusal is part of creative authorship, not an error state or approval concierge. |
| 33 | **PUBLIC PROMISE BOND** | A seller’s public claim is scraped, hashed, and paired with a measurable trigger. If the live page later changes, the agent preserves the original promise and prepares a claim against an escrowed bond. | Web claims become executable liabilities. The agent does not summarize or recommend; it creates consequences for semantic drift. |
| 34 | **SILENCE BUDGET** | Interview subagents must explicitly spend a limited number of “unasked question” tokens. The published story includes an omission ledger showing which unanswered question was knowingly excluded and why. | It governs absence rather than producing more research. The scarce resource is what the agent chooses not to pursue. |

# 4. Bit–Flip–Spark for the strongest six

## 1. LADDER

- **BIT:** Human preference is a static instruction or a scalar reward revealed through explicit thumbs-up/down.
- **FLIP:** Preference is a latent, hierarchical, uncertain state inferred from the full human–agent interaction: edits, rejections, option choices, approvals, reruns, subagent selections, and latency.
- **SPARK:** The harness can decide when it has enough evidence to act and when the probability of choosing the wrong branch requires asking. Demo: approve-after-edit changes the Gaussian posterior; the next apparently similar action produces a clarification card instead of automatic execution.

## 2. TERMSHIFT

- **BIT:** Once a human approves a purchase, approval remains valid unless price changes.
- **FLIP:** Approval is valid only while the semantic promises under which it was given remain invariant.
- **SPARK:** Live web drift revokes stale consent. Demo: change “free cancellation” to “credit only”; Bright Data verification fails, the agent repairs the extractor, computes the semantic delta, and freezes the previously approvable purchase.

## 3. CONSENT EXAM

- **BIT:** Consent is a signed document or clicked checkbox.
- **FLIP:** Consent is demonstrated comprehension under counterfactual questioning.
- **SPARK:** The harness interaction becomes auditable evidence of understanding. Demo: a participant answers a risk question incorrectly, gets a new explanation, passes a different discriminator, and only then unlocks enrollment approval.

## 4. TOOLIPO

- **BIT:** The orchestrator should decide which subagents and tools deserve compute.
- **FLIP:** Subagents should compete for resources by exposing expected value, uncertainty, cost, and a falsifiable deliverable.
- **SPARK:** Tool use becomes an observable market. Demo: expensive and cheap bids arrive in parallel; the auction funds a mid-priced specialist because its expected information gain per token is highest.

## 5. CUT ROOM

- **BIT:** A human directs generative media by finding a better prompt.
- **FLIP:** A human reveals taste through concrete selection among divergent artifacts.
- **SPARK:** Direction becomes interaction, not prompt engineering. Demo: three subagents render incompatible cuts; selecting one moment and rejecting another causes a fourth composite cut without the user writing prose.

## 6. MANDATE

- **BIT:** Once an agent receives a task, later instructions should be treated as legitimate elaborations.
- **FLIP:** Scope expansion is a new authorization event, even when requested by the same user in the same conversation.
- **SPARK:** Agents can distinguish continuation from mission creep. Demo: “draft the notice” becomes “send it to every customer”; the worker stops, presents the exact mandate delta, and resumes only with a bounded authorization.

# 5. Live-demo pre-mortem

## LADDER

- TrueForge events do not expose one of the assumed signals cleanly.
- Three interactions move the posterior too little to make the change visible.
- Hard-coded demo priors make the learning look staged.
- Approval denial and option rejection are conflated.
- The clarification card does not resume with the selected value.
- UI cannot explain a Gaussian posterior in under 20 seconds.
- Long interaction consumes the entire three-minute demo.
- Fallback: preseed a transparent prior and show one large, mathematically justified update.

## TERMSHIFT

- Bright Data credentials, rate limits, or conference Wi-Fi fail.
- The public target blocks scraping or changes unpredictably.
- Drift repair returns syntactically valid but semantically wrong fields.
- The team cannot verify real Bright Data CLI arguments in time.
- Approval is not actually invalidated after the covenant changes.
- A local mutated fixture makes Bright Data look decorative.
- Purchase MCP is unavailable, leaving no real side effect.
- Fallback: cache one real Bright Data response, then run drift/repair against a team-controlled live page while clearly labeling the cached boundary.

## CONSENT EXAM

- The concept sounds paternalistic or medically overclaimed.
- Structured cards feel like a quiz UI pasted over a chatbot.
- The agent accidentally reveals the correct answer before testing comprehension.
- The second question measures memorization, not understanding.
- Enrollment writes only to a toy database and feels fake.
- A participant can loop indefinitely.
- Medical content introduces accuracy and liability questions.
- Fallback: use a fictional low-risk research study and label the build as a protocol demonstrator, not clinical software.

## TOOLIPO

- Parallel subagents are slow or fail on venue Wi-Fi.
- Cost numbers are simulated and therefore unconvincing.
- The auction rule is too opaque for a live audience.
- Deferred tool search adds latency.
- Every bidder proposes similar work, producing no meaningful market.
- The selected result has no outward side effect.
- Spans/timings are not visible enough in the UI.
- Fallback: use three fixed job roles with live bids and one deterministic auction formula; publish the winner’s artifact to a real repo issue.

## CUT ROOM

- Media upload or sandbox transfer is too slow.
- FFmpeg is absent or codecs differ in Daytona.
- Parallel renders exceed the demo window.
- Large-result offload path cannot be previewed by the UI.
- Registered OpenUI video components are not ready.
- Generated cuts are insufficiently different.
- Publish action lacks a real destination.
- Fallback: ship with a ten-second provided clip, prevalidated FFmpeg commands, low-resolution renders, and a real approved upload to a team-owned destination.

## MANDATE

- The “mandate detector” is only prompt text and feels trivial.
- The agent fails to notice the scope expansion.
- It overreacts to harmless clarification and becomes annoying.
- Native approval gates occur only at the eventual write, not at mandate amendment.
- The resumed turn loses the original draft.
- The demo ends in refusal rather than completed action.
- A hostile judge asks why ordinary tool approval is insufficient.
- Fallback: use an explicit signed mandate object with machine-checkable allowed verbs, targets, and cardinality.

# 6. Ranked top six

## 1. LADDER

**20-second stranger pitch:**  
“LADDER learns what you actually value from how you work with the agent—not just what you say or whether you click thumbs-up. It maintains uncertainty over a values-to-consequences-to-attributes tree, learns from approvals, edits, rejections, reruns, and agent choices, then asks only when its probability of making the wrong decision is too high.”

**Why the harness is load-bearing:**

- `Agent → Session → Turn → Event → Delta` is the training stream.
- Clarification cards are active-learning queries.
- Approval decisions are high-value labeled observations.
- Subagent choices and reruns provide comparative observations.
- Persistence lets the posterior matter across turns and reconnects.
- Compaction is useful because learning survives even as conversation text is summarized.
- Generative UI can display the current ladder and uncertainty, but that display is decorative; the update/control law is the product.
- Sandbox/Code Mode is useful for posterior updates but replaceable.

**Bright Data:** None.

**Strongest hostile objection:**  
“This is a hand-designed preference model demonstrated on three clicks, not evidence of alignment.”

**Best answer:**  
“Correct: it is not universal alignment. The claim is narrower and testable: TrueForge already captures richer behavioral labels than binary RLHF uses at interaction time. We convert those labels into an explicit posterior and use calibrated uncertainty to govern ask-versus-act. The demo exposes every update and allows the judge to predict the next gate.”

**Today:**

- Five preference dimensions.
- Three-layer tree represented as JSON.
- Gaussian mean/variance per dimension.
- Four event-to-update mappings.
- Flip-probability threshold controlling one clarification card.
- One approved outward write.
- Posterior inspector showing before/after values.

**Next:**

- Learned event likelihoods.
- Contextual and temporal preferences.
- Preference decay and contradictory-user handling.
- Offline calibration against longer sessions.
- Cross-agent portability with explicit privacy boundaries.

**TrueFoundry FDE “best harness use” guess:** **4.9/5**

---

## 2. TERMSHIFT

**20-second stranger pitch:**  
“TERMSHIFT makes an agent’s approval expire when the web promise behind it changes. It turns live price, refund, cancellation, and delivery language into executable invariants. If a site drifts, the agent repairs its scraper, shows the semantic difference, and refuses to act under stale consent.”

**Why the harness is load-bearing:**

- Bright Data MCP supplies live source material inside the turn.
- Code Mode keeps extraction, comparison, and only the semantic delta in context.
- Daytona runs repair and verification against the versioned registry.
- Human approval binds to a specific covenant hash.
- Session persistence connects the original approval state to later drift.
- Skills carry extraction/repair rules and require the sandbox.
- Large-result offload is useful for HTML snapshots but not central.
- Dynamic subagents are unnecessary and would be decorative.
- Generative UI makes the semantic diff understandable but does not create the safety property.

**Bright Data angle:**  
Core, honest, and unusually strong. Every target lives in `scrapers/registry.json`; verification failure causes repair, revision bump, drift-log entry, and rerun. The structured result drives the approval state.

**Strongest hostile objection:**  
“You manufactured page drift, so this is a scraper demo with an approval card.”

**Best answer:**  
“The drift can be induced on a team-controlled public merchant page, but the fetch is real and the same registry/repair pipeline handles it. More importantly, the repaired value changes the covenant hash and invalidates a previously valid action. Remove Bright Data or persistent approval state and the product no longer works.”

**Today:**

- One controlled live merchant page.
- Four covenant fields.
- Real Bright Data fetch command copied from verified help.
- Verification, deliberate HTML drift, repair, log, and rerun.
- Approval cryptographically/scopingly tied to the extracted covenant.
- Approved write to a mock checkout ledger or real team-controlled order endpoint.

**Next:**

- Multiple merchants.
- Semantic contradiction detection across checkout stages.
- Signed snapshots and dispute packages.
- Real payment MCP.
- Merchant-side promise bonds.

**TrueFoundry FDE guess:** **4.7/5**

---

## 3. CONSENT EXAM

**20-second stranger pitch:**  
“CONSENT EXAM replaces ‘I agree’ with proof that a participant understands what they are agreeing to. The agent teaches a study concept, asks a counterfactual question, adapts when the answer reveals a misconception, and unlocks enrollment only after comprehension is demonstrated.”

**Why the harness is load-bearing:**

- Clarification cards are the assessment—not merely form controls.
- Session persistence preserves which concepts were demonstrated.
- The event hierarchy provides an auditable comprehension trail.
- Approval separates demonstrated understanding from final voluntary enrollment.
- Sandbox/Code Mode scores answers against explicit concept rubrics.
- A Git-backed skill supplies the study-specific teaching and assessment protocol.
- Generative UI is important for stranger usability but replaceable.
- Dynamic subagents are optional; adding them today would be decorative.

**Bright Data:** None.

**Strongest hostile objection:**  
“An LLM-generated quiz cannot establish informed consent.”

**Best answer:**  
“We are not claiming legal or clinical sufficiency. Today’s artifact demonstrates a stronger interaction primitive: consent state depends on observable comprehension rather than document completion. The rubric and accepted counterfactuals are authored in the study skill, not improvised by the model.”

**Today:**

- Fictional, low-risk study.
- Three required concepts.
- Two misconception branches.
- Structured selectable questions.
- Persistent concept-state panel.
- Final separately approved append-only enrollment.
- Explicit “protocol demonstrator, not medical software” boundary.

**Next:**

- Clinician-authored rubrics.
- Accessibility and multilingual validation.
- Participant withdrawal flows.
- Ethics-board review.
- Signed audit exports and EHR integration.

**TrueFoundry FDE guess:** **4.5/5**

---

## 4. TOOLIPO

**20-second stranger pitch:**  
“TOOLIPO gives four agent workers a fixed budget and makes them bid for access to expensive tools. Each must state cost, expected information gain, uncertainty, and a falsifiable deliverable. The harness funds one plan, runs it, and exposes whether the investment paid off.”

**Why the harness is load-bearing:**

- Dynamic subagents are the economic actors.
- Isolated contexts prevent bidders from copying one another.
- Deferred tool loading makes tool access genuinely scarce.
- Tool calls and timings provide realized cost.
- Sandbox/Code Mode runs the auction and settlement.
- Clarification card sets the human’s budget/risk preference.
- Approval authorizes the winning expenditure or outward publication.
- Generative UI is useful for bids but decorative.
- Large-result offload matters only if the winning tool returns a large payload.

**Bright Data angle:**  
Optional and honest only as one priced tool available to bidders. It should not be entered for the Bright Data prize unless the winning live path includes the full registry, verification, drift, and repair contract.

**Strongest hostile objection:**  
“The agents are bidding with invented prices and self-reported value.”

**Best answer:**  
“Today, token/tool prices are declared constants, but execution cost and completion are measured by the harness. The key claim is not a perfect market; it is that isolated agents must expose a resource contract before receiving tools, making orchestration inspectable and budget-constrained.”

**Today:**

- Three specialized bidders.
- One shared task.
- Fixed token/tool price table.
- Transparent value-per-cost auction.
- Real parallel spans.
- One funded MCP path.
- Approved publication of the winner’s artifact.

**Next:**

- Historical calibration of bid reliability.
- Deposits and penalties for failed delivery.
- Coalition bids.
- Dynamic pricing under rate limits.
- Organization-wide budget policies.

**TrueFoundry FDE guess:** **4.3/5**

---

## 5. CUT ROOM

**20-second stranger pitch:**  
“CUT ROOM replaces prompt tweaking with actual directing. Three isolated editor agents cut the same ten-second clip differently. You pick a moment, reject a transition, and the harness renders a composite cut—then asks before publishing it.”

**Why the harness is load-bearing:**

- Dynamic subagents create independent editorial directions.
- Daytona performs real media work and retains files for the session.
- Code Mode invokes deterministic FFmpeg operations.
- Large-result offload prevents media artifacts from entering model context.
- Clarification cards turn concrete selections into resumable direction.
- Approval gates publication.
- Generative UI is central to usability but not to agent orchestration.
- Session persistence is helpful but not essential in a three-minute demo.
- Deferred tool loading is unnecessary.

**Bright Data:** None.

**Strongest hostile objection:**  
“This is three FFmpeg scripts behind an agent UI.”

**Best answer:**  
“The scripts render; they do not direct. The harness isolates competing editorial agents, retains their artifacts outside context, converts human artifact selection into a resumable instruction, and composes the winning decisions before a gated publication. Remove those primitives and it becomes manual file processing.”

**Today:**

- One provided ten-second clip.
- Three deterministic editorial styles.
- Parallel low-resolution renders.
- Registered video/selection component.
- One selection-driven composite.
- Approved publication to a team-controlled destination.

**Next:**

- Audio, captions, and longer footage.
- Persistent director taste model.
- Rights-clearance subagent.
- Collaborative multi-user direction.
- High-resolution background renders.

**TrueFoundry FDE guess:** **4.0/5**

---

## 6. MANDATE

**20-second stranger pitch:**  
“MANDATE lets an agent recognize when the job quietly changed. If ‘draft a notice’ becomes ‘send it to every customer,’ the worker stops, shows the exact authority delta, and asks for a scoped amendment before resuming the same task.”

**Why the harness is load-bearing:**

- Session and event persistence retain the original mandate.
- Clarification cards negotiate a structured amendment.
- Per-tool approval still gates the eventual irreversible write.
- Isolated subagents can receive distinct authority scopes.
- Skills materialize the mandate-checking policy in the sandbox.
- Compaction matters because the mandate must survive summarized history.
- Dynamic subagents are useful only in a multi-worker demo; otherwise decorative.
- Generative UI is presentation, not enforcement.

**Bright Data:** None.

**Strongest hostile objection:**  
“This is just another system prompt telling the agent to ask permission.”

**Best answer:**  
“The mandate is a machine-checkable object—allowed verbs, target set, maximum cardinality, and prohibited effects—not prose. The requested tool call is diffed against it. Ordinary approval answers ‘may this call run?’; MANDATE first asks whether the agent’s mission itself has changed.”

**Today:**

- Structured mandate schema.
- Three enforceable dimensions: verb, target, cardinality.
- One drafting task that broadens into bulk sending.
- Visible mandate diff.
- Structured amendment card.
- Resumed completion plus separate send approval.

**Next:**

- Delegated authority chains.
- Expiring mandates.
- Organization policies.
- Cross-agent authority transfer.
- Cryptographically signed amendments.

**TrueFoundry FDE guess:** **4.0/5**

# The three I would put in front of the human

1. **LADDER** — the strongest primary-track thesis. It treats TrueForge’s interaction history, approvals, structured questions, subagents, and persistence as a learning substrate. It is the idea least reproducible as a thin chat wrapper.

2. **TERMSHIFT** — the strongest prize portfolio and clearest three-minute spectacle: approve → live HTML changes → verification fails → repair runs → semantic promise changes → stale approval is revoked. It gives Bright Data a causal role and produces excellent UI and blog material.

3. **CONSENT EXAM** — the safest polished vertical slice. It is stranger-drivable, makes clarification cards semantically essential, has a clean irreversible gate, and can be built without fragile third-party integrations.

My build-day choice would come down to ambition versus reliability: **LADDER** if its event hooks are already accessible in the running TrueForge instance; otherwise **TERMSHIFT**, with **CONSENT EXAM** as the low-network fallback. The hackathon-shipper discipline materially favors these three because each has one legible three-minute transformation and a bounded fallback rather than a broad feature surface.
