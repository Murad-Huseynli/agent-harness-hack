# LADDER

**A proposal: the approval queue is a training set.**

Agent Harness Hackathon — WeMakeDevs × TrueFoundry × Bright Data × Qodo × OpenAI,
San Francisco, 29 August 2026.

> **Status: research complete, product not yet built.** Everything in the
> [Research](#research) section is finished and on `main`. Everything describing LADDER's
> behaviour is a **design**, not a running system. The
> [build/planned matrix](#what-exists-right-now) below says exactly which is which.

---

## The idea

When an agent harness is configured to gate a consequential tool call, it pauses and asks a
human *allow or deny*. The decision is typically consumed as a boolean and not used to
model the person making it.

That queue carries more than a bit. A person approving, denying, **editing before
approving**, choosing between two proposals, re-running with a changed parameter, or
leaving a request pending is producing behavioural signal about which properties of an
action they treat as acceptable — signal they did not intend as feedback and might not
articulate the same way if asked directly.

LADDER proposes to read that stream into a per-user posterior over **attributes of proposed
actions** — reversible/irreversible · public/private · spend · audience size · provenance ·
delay cost · scope — and to use the posterior's *uncertainty* to decide how much the agent
should ask about **reversible and optionally-gated** work.

**Irreversible and policy-mandated actions always require human approval, regardless of
what the model believes.** The posterior can only ever *raise* the bar for acting alone; it
can never lower it, and it can never authorize something a hard rule blocks. This is
binding — see [`CLAUDE.md`](CLAUDE.md) and the safety invariant in
[`research/THESIS.md`](research/THESIS.md).

The aim is an agent that asks less about what it has learned, and keeps asking about what
it has not.

## The honest claim

> We propose to operationalize established Bayesian user modeling and value-of-information
> control on a data substrate that has become common only recently: the typed approval and
> correction traces emitted by production agent harnesses.

Integration and substrate, not new inference mathematics. The mathematics is
Horvitz-lineage Bayesian user modelling and expected value of information.

**Whether the substrate is genuinely unexplored is UNVERIFIED.** Twelve adversarial
vocabulary searches did not surface a paper treating a general-purpose harness's approval
queue this way, but absence of evidence in twelve searches is not proof — a gap in our
search is a fact about our search, not about the field.
[`research/NOVELTY-AUDIT.md`](research/NOVELTY-AUDIT.md) lists what still needs checking.

**Already published — we cite these, we do not claim them:**

| Claim | Source | Venue status |
|---|---|---|
| RLHF aggregates heterogeneous people into an "average user" | [Garbacea 2026](https://arxiv.org/abs/2606.07629) | arXiv **position paper** |
| Bradley-Terry is not a necessary reward-modelling choice | [Sun, Shen & Ton 2024](https://arxiv.org/abs/2411.04991) | arXiv preprint, 46 citations |
| User edits are a rich latent-preference signal | [Gao et al. 2024 — PRELUDE/CIPHER](https://arxiv.org/abs/2404.15269) | **NeurIPS 2024**, 96 citations |
| Uncertainty can personalize interaction timing online | [Wang et al. 2026 — EOPA](https://arxiv.org/abs/2608.04416) | arXiv preprint; **simulation benchmark**, not deployed users |

**Adjacent foundations** — these establish the decision-theoretic principle, not a
precedent for autonomous authority over irreversible tool calls:
[Horvitz, *Principles of Mixed-Initiative User Interfaces*, CHI 1999](https://doi.org/10.1145/302979.303030) ·
[Horvitz et al., *The Lumière Project*, UAI 1998](https://arxiv.org/abs/1301.7385) ·
[Horvitz, Koch & Apacible, *BusyBody*, CSCW 2004](https://erichorvitz.com/busybody_cscw.htm)

## Three things the research changed

**1 · Flip-probability is a UI statistic, not the control law.** "Ask when more information
would probably flip the decision" is risk-insensitive: a 40% chance of flipping a formatting
choice matters less than a 1% chance of preventing an irreversible disclosure. Control
should use EVSI weighted by consequence; flip-probability is worth showing because it is
legible.

**2 · Approval is not careful endorsement.**
[*Habituation at the Gate*](https://arxiv.org/abs/2606.22721) (2026) studied 400 repeat
reviewers over 11,429 pull-request reviews and found approval rising **30.1% → 36.8%**,
inline comments falling **22%**, and review latency *increasing* **3.5×** — consistent with
habituation under workload rather than trust calibration. That is PR review, not harness
tool approvals, so **transferring it is our hypothesis, not their result.** The design
consequence we propose: model a latent review state `{careful, cursory, unseen}` and let
confidence fall when scrutiny proxies decay. **A streak of rubber stamps must never expand
autonomy.**

**3 · Safety is lexicographic, never learned.** Hard rules → mandated approvals → *only
then* personal utility, and only over the reversible remainder.

## What exists right now

| | State | Evidence |
|---|---|---|
| Literature review, novelty audit, ideation, adversarial review | **Done** | [`research/`](research/) |
| TrueForge v0.1.4 installed and serving | **Done** | `HTTP 200` on `localhost:8790`; API surface probed |
| Bright Data CLI installed, signatures captured | **Done** | [`scrapers/cli-help-output.md`](scrapers/cli-help-output.md) |
| Qodo review on a real PR, findings fixed | **Done** | [PR #1](https://github.com/Murad-Huseynli/agent-harness-hack/pull/1) |
| Verification harness (probe, judge, recorder) | **Written, not yet run against a product** | [`verify/`](verify/) |
| **The posterior, the controller, the UI, the agent** | **Not built** | [`verify/evidence.md`](verify/evidence.md) — all `NOT RUN` |

There is no `dev` script yet, no TrueForge SDK dependency, and no Daytona key. Treat every
capability sentence above the matrix as design intent until this table says otherwise.

## Build

Locked and handed off: **[`BUILD.md`](BUILD.md)**. The frozen event→attribute mapping is
[`ladder/MAPPING.md`](ladder/MAPPING.md) — committed before any outcome was collected.

## Research

Completed before any product code, so the build executes against evidence rather than a
hunch. **Start at [`research/README.md`](research/README.md).**

| Doc | What it settles |
|---|---|
| [THESIS.md](research/THESIS.md) | The claim at maximum defensible strength, and the five overclaims that would lose an ML-literate judge |
| [NOVELTY-AUDIT.md](research/NOVELTY-AUDIT.md) | The five closest published papers, read at full strength |
| [FOUNDATIONS.md](research/FOUNDATIONS.md) | 164-citation review: ML alignment · Bayesian preference elicitation · intent inference · marketing's unrevealed-intent tradition · revealed-preference economics · market microstructure · mixed-initiative HCI |
| [IDEATION.md](research/IDEATION.md) | 34 candidates, the two largest generic clusters deleted outright, six ranked |
| [ADVERSARIAL-REVIEW.md](research/ADVERSARIAL-REVIEW.md) | Three hostile judges over three finalists, with demo-failure probabilities |

Discovery used twelve adversarial vocabulary translations — *prior art is missed because it
is indexed under another field's words* — against arXiv and Semantic Scholar, then citation
walks on the load-bearing seeds. Every arXiv ID above was resolved against Semantic Scholar
and matches the paper described.

## Planned use of TrueForge primitives

[TrueForge](https://github.com/truefoundry/trueforge) v0.1.4 is installed and serving
locally. **None of the rows below have been configured or exercised yet** — this is the
design for why the harness would be load-bearing rather than decorative.

| Primitive | Intended role |
|---|---|
| **Human tool approval** | The safety gate *and* the sensor. Without it there is no data and no product. |
| **Session persistence** | The posterior must survive reconnect, or the claim is untestable. |
| **Daytona sandbox** | Run inference as agent-written code, so numbers are computed and recomputable from the event log rather than narrated by a model. |
| **Code Mode** | Score candidate actions without their payloads entering model context. |
| **Clarification cards** | The "ask" branch, selected by expected information gain. |
| **Subagents** | Competing hypotheses about which attribute an event is evidence for. |
| **Generative UI** | Belief and comparison cards generated per decision rather than templated. |

## Verifying it

```bash
npm install
npx playwright install chromium
cp .env.example .env          # fill in credentials

npm run probe                 # console errors, text overlap, CLS, frame times; exits non-zero on failure
npm run judge                 # independent model-graded pass against rubric.md
npm run record                # captioned demo video off the live UI
```

Every rung reports **PASS with real output**, **FAIL with the error**, or **NOT RUN** —
never green by assumption. Ledger: [`verify/evidence.md`](verify/evidence.md).

Setup and arrival checklist: [`SETUP.md`](SETUP.md).
Build rules, gates and the Bright Data scraper contract: [`CLAUDE.md`](CLAUDE.md)
(symlinked as `CODEX.md`, referenced by `AGENTS.md`).

## Qodo Code Review Evidence

### PR #1 — [fix(brightdata): replace guessed env var, pin verified CLI surface](https://github.com/Murad-Huseynli/agent-harness-hack/pull/1)

Run with `/agentic_review`. Qodo returned three findings. **All three were valid; all three
were fixed before merge.** (Four earlier scaffolding commits went directly to `main` before
this PR — the PR path started here.)

**Finding 3 · High — "Command signatures remain guessed."** The scraper contract listed
`brightdata scraper create ...` with literal ellipses, omitting required positional
arguments — while `CLAUDE.md` only required `--help` for commands *absent* from the page.
Qodo identified the trap: an assistant would treat the listed commands as verified and still
guess their arguments, "producing invalid or unsafe repair commands." A flaw in the rule's
design, not a typo.

*Fixed* by installing the CLI and capturing real signatures —
`scraper heal <collector_id> <prompt>`, `scraper approve <collector_id>` (supports
`--reject`) — and rewriting the rule so a command counts as verified only when its **full
signature including positional arguments** is documented. Raw `--help` output committed
verbatim: [`scrapers/cli-help-output.md`](scrapers/cli-help-output.md).

**Finding 2 · Medium — "Valid bdata alias forbidden."** The doc asserted "the binary is
`brightdata`, not `bdata`." False. The npm manifest declares
`{ brightdata: 'dist/index.js', bdata: 'dist/index.js' }` — both install, identical entry
point. The wrong claim had already been used to tell a teammate their command was invented.
*Fixed*, and kept **visible** in [`scrapers/brightdata-cli.md`](scrapers/brightdata-cli.md)
rather than silently edited.

**Finding 1 · Medium — "Cli behavior lacks execution evidence."** A functional claim about
which environment variable the CLI reads came from documentation rather than execution.
*Fixed*: real `--help` output committed; the env-var precedence claim downgraded to
explicitly unconfirmed pending an authenticated `brightdata config get`.

A re-review was requested on the same PR after the fixes.

## License

MIT — see [LICENSE](LICENSE).
