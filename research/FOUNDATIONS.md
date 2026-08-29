# Foundations — the literature this is built on

**Commissioned literature review, 2026-08-29.** 164 citations. Covers: the formal structure
of RLHF's preference model and its critiques · Bayesian preference elicitation · intent
inference from behaviour · the marketing unrevealed-intent tradition · revealed-preference
economics · market-microstructure inference of hidden type · mixed-initiative interaction
and interruption · validation without ground truth · an honest gap analysis · and ten
design implications we had not proposed.

Read alongside [`NOVELTY-AUDIT.md`](NOVELTY-AUDIT.md) (what is already published) and
[`THESIS.md`](THESIS.md) (what we actually claim, with these corrections applied).

> Sections 7, 9 and 10 are the load-bearing ones. §7 shows the ask-vs-act principle is
> established (Horvitz, 1999) and that our flip-probability rule is **not** EVSI. §9 gives
> the honest novelty sentence. §10 contains ten corrections, several of which change the
> design.

---

## 1. What RLHF’s preference model actually is, formally

For prompt \(x\), preferred response \(y_w\), and rejected response \(y_l\), canonical RLHF fits a scalar reward \(r_\phi(x,y)\) with the Bradley–Terry likelihood

\[
P_\phi(y_w \succ y_l\mid x)
=\frac{\exp r_\phi(x,y_w)}
{\exp r_\phi(x,y_w)+\exp r_\phi(x,y_l)}
=\sigma(r_\phi(x,y_w)-r_\phi(x,y_l)),
\]

minimizing \(-\sum_i\log P_\phi(y_{w,i}\succ y_{l,i}\mid x_i)\). For a full ranking \(\pi\), Plackett–Luce factorizes the ranking probability into successive softmax choices. Christiano et al. used comparisons between trajectory clips; InstructGPT collected rankings of several responses and trained its reward model on the induced comparisons ([Christiano et al., 2017, “Deep Reinforcement Learning from Human Preferences”](https://papers.nips.cc/paper/7017-deep-reinforcement-learning-from-human-preferences.pdf); [Ouyang et al., 2022, “Training Language Models to Follow Instructions with Human Feedback,” arXiv:2203.02155](https://arxiv.org/abs/2203.02155)).

Canonical PPO-RLHF then freezes \(r_\phi\) while optimizing

\[
\max_\theta\;
\mathbb E_{y\sim\pi_\theta(\cdot\mid x)}
[r_\phi(x,y)]
-\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\rm ref}).
\]

Thus the learned reward is a point-estimated, context-conditioned scalar proxy for the training annotators’ choices—not a cardinal psychological utility and not “human values.” InstructGPT explicitly says it aligns to the preferences of its labelers and researchers rather than humanity in general ([Ouyang et al., 2022, “Training Language Models to Follow Instructions with Human Feedback”](https://arxiv.org/abs/2203.02155)). “Frozen” describes that specific optimization phase, not every RLHF system: online and iterative preference-optimization methods recollect data as the policy changes ([Calandriello et al., 2024, “Human Alignment of Large Language Models through Online Preference Optimisation,” arXiv:2403.08635](https://arxiv.org/abs/2403.08635)).

DPO removes the separately deployed reward network, but not the latent-reward or Bradley–Terry assumptions. It substitutes

\[
r(x,y)=\beta\log\frac{\pi_\theta(y\mid x)}
{\pi_{\rm ref}(y\mid x)}+C(x)
\]

into the same logistic comparison likelihood and optimizes the resulting classification objective ([Rafailov et al., 2023, “Direct Preference Optimization: Your Language Model Is Secretly a Reward Model,” arXiv:2305.18290](https://arxiv.org/abs/2305.18290)). DPO assumes, among other things, a KL-regularized optimal-policy relationship, adequately covered offline comparisons, and a suitable stochastic preference model; eliminating the explicit reward-model artifact does not eliminate misspecification or overoptimization ([Rafailov et al., 2024, “Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms,” arXiv:2406.02900](https://arxiv.org/abs/2406.02900)).

### Which alleged “collapses” are real?

| Claim | Verdict |
|---|---|
| “RLHF reduces feedback to binary comparisons.” | **Mostly real but imprecise.** The training likelihood is normally binary even when labels originate as \(K\)-way rankings; richer feedback—ratings, critiques, edits, rankings, language—is already studied. A binary comparison carries at most one bit, while linguistic or corrective feedback can identify dimensions and directions ([Kompella et al., 2024, “Trajectory Improvement and Reward Learning from Comparative Language Feedback,” arXiv:2410.06401](https://arxiv.org/abs/2410.06401); [Wu et al., 2024, “Aligning Large Language Models via Fine-grained Supervision”](https://aclanthology.org/2024.acl-short.62/)). |
| “RLHF collapses preference to one scalar.” | **Real at the output of canonical reward models, but not proof that only one latent dimension is represented.** A neural scalar can encode complex nonlinear and contextual criteria. What is lost is separately identifiable dimensions, uncertainty, and reasons. Multi-objective and hierarchical reward models already address this ([Wang et al., 2024, “Interpretable Preferences via Multi-Objective Reward Modeling and Mixture-of-Experts”](https://aclanthology.org/2024.findings-emnlp.620/); [Lai et al., 2024, “ALaRM: Align Language Models via Hierarchical Rewards Modeling”](https://aclanthology.org/2024.findings-acl.465/)). |
| “RLHF averages a population.” | **Established for pooled data without annotator identity.** Hidden annotator/context variation is implicitly aggregated; Siththaranjan et al. show that standard preference learning can implement a Borda-like social-choice rule rather than expected-utility aggregation ([Siththaranjan, Laidlaw & Hadfield-Menell, 2023, “Distributional Preference Learning,” arXiv:2312.08358](https://arxiv.org/abs/2312.08358)). |
| “That aggregation is necessarily an Arrow-impossibility violation.” | **Contested/overstated.** RLHF’s stochastic labels, cardinal scores, changing menus, and policy optimization differ from classical social-choice domains; Arrow’s theorem cannot simply be imported unchanged ([Dai & Fleisig, 2024, “Mapping Social Choice Theory to RLHF,” arXiv:2404.13038](https://arxiv.org/abs/2404.13038)). |
| “Annotator disagreement is merely noise.” | **False as a normative statement, often true operationally.** Disagreement can encode stable group tastes, ambiguity, or different rubrics; suppressing it may worsen representativeness ([Plank, 2022, “The ‘Problem’ of Human Label Variation”](https://aclanthology.org/2022.emnlp-main.731/); [Siththaranjan et al., 2023, “Distributional Preference Learning”](https://arxiv.org/abs/2312.08358)). |
| “RLHF has no personalization.” | **Already solved in several formulations, not in general deployment.** User-conditioned rewards, latent user variables, clustering, and personalized policies exist ([Li et al., 2024, “Personalized Language Modeling from Personalized Human Feedback,” arXiv:2402.05133](https://arxiv.org/abs/2402.05133); [Poddar et al., 2024, “Personalizing RLHF with Variational Preference Learning,” arXiv:2408.10075](https://arxiv.org/abs/2408.10075); [Park et al., 2024, “RLHF from Heterogeneous Feedback via Personalization and Preference Aggregation,” arXiv:2405.00254](https://arxiv.org/abs/2405.00254)). |
| “RLHF carries no uncertainty.” | **True of typical point-estimate use, not of the field.** Bayesian, ensemble, distributional, and uncertainty-penalized reward models exist ([Zhan et al., 2024, “Uncertainty-Penalized RLHF,” arXiv:2401.00243](https://arxiv.org/abs/2401.00243); [Poddar et al., 2024, “Variational Preference Learning”](https://arxiv.org/abs/2408.10075)). |
| “Binary comparisons adequately represent preference.” | **A modeling assumption, not an established fact.** Bradley–Terry requires a latent score whose differences explain pairwise probabilities; cyclic, lexicographic, context-dependent, heterogeneous, and criterion-switching choices can violate it ([Boutilier et al., 2004, “CP-nets”](https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume21/boutilier04a.pdf); [Siththaranjan et al., 2023, “Distributional Preference Learning”](https://arxiv.org/abs/2312.08358)). |

Reward misspecification is independently established: optimization can increase proxy reward while degrading a stronger “gold” reward, with predictable dependence on model/data scale ([Gao, Schulman & Hilton, 2022, “Scaling Laws for Reward Model Overoptimization,” arXiv:2210.10760](https://arxiv.org/abs/2210.10760)). Minority-preference suppression can also arise in the policy-optimization step even when the reward model represents a distribution of preferences ([Xiao et al., 2024, “Preference Collapse and Matching Regularization,” arXiv:2405.16455](https://arxiv.org/abs/2405.16455)).

**Precise thesis correction:** your system does not generally “replace RLHF.” It replaces—or augments—the deployment-time preference representation and autonomy controller. It is comparable to a personalized Bayesian reward/user model, not to the entire RLHF pipeline. The defensible contrast is: *canonical pooled offline reward modeling estimates a point scalar used during post-training; this system maintains a per-user, context- and feature-conditioned posterior online and uses its decision uncertainty to allocate control.*

## 2. Preference elicitation and Bayesian preference models

A suitable core model is

\[
\theta_{u,t}\sim p(\theta_{u,t}\mid\theta_{u,t-1}),\qquad
P(y_t\mid\theta_{u,t},a_t,c_t,m_t),
\]

where \(\theta\) contains attribute weights and conditional/value structure; \(a_t\) is the proposed action’s feature vector; \(c_t\) is context; and \(m_t\) identifies approval, edit, interruption, latency, or choice. The update is

\[
p(\theta_t\mid H_t)\propto
p(y_t\mid\theta_t,a_t,c_t,m_t)
\int p(\theta_t\mid\theta_{t-1})p(\theta_{t-1}\mid H_{t-1})\,d\theta_{t-1}.
\]

### Relevant model families

| Tradition | Formal contribution | Failure modes and transfer |
|---|---|---|
| Hierarchical-Bayes conjoint | Individual part-worths \(\beta_u\sim N(\mu,\Sigma)\); choices follow mixed logit \(P(j)=\exp(x_j^\top\beta_u)/\sum_k\exp(x_k^\top\beta_u)\). Partial pooling gives individual estimates from sparse responses ([Allenby, Rossi & McCulloch, 2005, “Hierarchical Bayes Models: A Practitioner’s Guide”](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=655541)). | Strong population priors may manufacture apparent certainty for an \(n=1\) user; mixed logit needs richer data than homogeneous logit ([Danthurebandara et al., 2012, “Individually Adapted Sequential Bayesian Conjoint-Choice Designs”](https://www.sciencedirect.com/science/article/pii/S0167811611000668)). |
| D-optimal/Bayesian choice design | Selects choice sets maximizing the determinant or expected log-determinant of Fisher information; Bayesian versions integrate over a prior. Bayesian designs have materially reduced standard errors in conjoint experiments ([Sándor & Wedel, 2001, “Designing Conjoint Choice Experiments Using Managers’ Prior Beliefs”](https://journals.sagepub.com/doi/10.1509/jmkr.38.4.430.18904)). | Myopic designs may repeatedly ask unnatural knife-edge questions, inherit bad priors, and optimize parameter precision rather than decision value. Use operationally feasible actions and interruption cost as constraints. |
| Gaussian-process preference learning | \(f(a)\sim GP\), with \(P(a\succ b)=\Phi((f(a)-f(b))/\sigma)\) or logistic analogue; posterior variance drives active queries ([Bıyık et al., 2020, “Active Preference-Based Gaussian Process Regression,” arXiv:2005.02575](https://arxiv.org/abs/2005.02575); [Houlsby et al., 2011, “Bayesian Active Learning for Classification and Preference Learning,” arXiv:1112.5745](https://arxiv.org/abs/1112.5745)). | Flexible but kernel-sensitive, computationally heavier, and semantically opaque; sparse data cannot distinguish genuine nonlinearity from noise. |
| Hierarchical Bradley–Terry/Plackett–Luce | Adds user-, group-, criterion-, or context-specific random effects to ranking likelihoods. It is a clean baseline for proposed-action comparisons ([Park et al., 2024, “RLHF from Heterogeneous Feedback”](https://arxiv.org/abs/2405.00254)). | Retains scalar-score, stochastic transitivity, and menu assumptions; scale and annotator-noise parameters are confounded without anchors. |
| CP-nets/lexicographic models | Represent statements such as “if public, reversibility dominates cost; if private, cost dominates delay,” using conditional ceteris-paribus preference graphs ([Boutilier et al., 2004, “CP-nets”](https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume21/boutilier04a.pdf)). | Natural for rules and exceptions, but preference tables grow with parents; dominance queries can be difficult, and qualitative order supplies neither intensity nor calibrated uncertainty. Use CP-net structure as an ontology/constraint layer over a probabilistic model. |
| TrueSkill/ADF/EP | Maintains Gaussian means and variances and performs online approximate Bayesian updates after ordinal outcomes ([Herbrich, Minka & Graepel, 2006, “TrueSkill: A Bayesian Skill Rating System”](https://proceedings.neurips.cc/paper/2006/file/f44ee263952e65b3610b8ba51229d1f9-Paper.pdf)). | Fast and implementation-friendly, but Gaussian projection loses multimodality; assumed-density filtering can be order-dependent, and a “skill” comparison does not automatically identify causal action attributes. |
| Bayesian logistic/contextual bandits | Posterior sampling or upper-confidence rules choose actions while learning context-conditioned payoff parameters ([Chu et al., 2011, “Contextual Bandits with Linear Payoff Functions”](https://proceedings.mlr.press/v15/chu11a.html); [Dumitrascu et al., 2018, “PG-TS: Improved Thompson Sampling for Logistic Contextual Bandits,” arXiv:1805.07458](https://arxiv.org/abs/1805.07458)). | They optimize exploration–exploitation, not necessarily human interruption or safe authority. Exploration that changes recipients, spending, or privacy may be unethical even when statistically efficient. |
| Active preference learning | Selects comparisons by expected information gain, ordering error, regret reduction, or version-space reduction ([Bergström et al., 2024, “Active Preference Learning for Ordering Items In- and Out-of-sample,” arXiv:2405.03059](https://arxiv.org/abs/2405.03059)). | Entropy reduction about all parameters can waste questions on distinctions irrelevant to the next action; decision-focused value of information is better for ask-versus-act. |

### Identifiability and collinearity

For logit choice, only utility differences are identified: \(x^\top\beta+c\) yields the same choices for every common additive \(c\). Utility scale is confounded with the error scale, so one noise/temperature parameter must be fixed or anchored. A feature’s part-worth is unrecoverable when it never varies, always co-occurs with another feature, appears only in rejected or approved alternatives, or is aliased with context or presentation order. Complete separation can send unregularized logistic estimates to infinity; interaction terms require independent variation beyond their parent attributes. These are design-matrix and likelihood properties, not defects Bayesian inference can erase ([Sándor & Wedel, 2001, “Designing Conjoint Choice Experiments”](https://journals.sagepub.com/doi/10.1509/jmkr.38.4.430.18904); [Wilson & Collins, 2019, “Ten Simple Rules for the Computational Modeling of Behavioral Data”](https://pmc.ncbi.nlm.nih.gov/articles/PMC6879303/)).

Standard remedies are reference/effects coding, fixing scale, balanced or D-optimal choice sets, randomized presentation, overlap between action types, repeated anchor choices, shrinkage priors, partial pooling, and parameter-recovery simulation. For roughly 30 events, eight action dimensions plus interactions, context effects, event-type reliabilities, and drift are not jointly recoverable unless the design is unusually informative. The posterior can still predict decisions, but semantic claims such as “privacy is twice as important as provenance” would usually be prior-driven. Report posterior correlations, information-matrix rank, prior sensitivity, and synthetic recovery before naming latent dimensions ([Wilson & Collins, 2019, “Ten Simple Rules…”](https://pmc.ncbi.nlm.nih.gov/articles/PMC6879303/)).

## 3. Intent inference from behaviour

IRL infers rewards under which observed behavior is optimal. The inverse problem is intrinsically non-unique: many reward functions rationalize the same policy, and potential-based reward transformations can preserve optimal behavior ([Ng & Russell, 2000, “Algorithms for Inverse Reinforcement Learning”](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf)). **POST-2025:** Skalse et al. provide a broader characterization of partial identifiability and behavioral-model misspecification in common IRL models ([Skalse et al., 2026, “Partial Identifiability and Misspecification in Inverse Reinforcement Learning”](https://www.sciencedirect.com/science/article/pii/S0004370226000512)).

Bayesian inverse planning instead specifies how an approximately rational actor chooses actions given goals and beliefs, then inverts that generative model. It can infer goals, beliefs, and perceptual states jointly, but its conclusions depend on the assumed planning competence and belief model ([Baker, Saxe & Tenenbaum, 2009, “Action Understanding as Inverse Planning”](https://doi.org/10.1016/j.cognition.2009.07.005); [Baker et al., 2017, “Rational Quantitative Attribution of Beliefs, Desires and Percepts in Human Mentalizing”](https://www.nature.com/articles/s41562-017-0064)).

Cooperative IRL/assistance games are closer to the thesis: a human and robot share the human’s payoff, only the human initially knows it, and both task actions and communication can reveal information. Optimal solutions naturally include asking, teaching, and deferring; the framework reduces to a partially observable control problem ([Hadfield-Menell et al., 2016, “Cooperative Inverse Reinforcement Learning,” arXiv:1606.03137](https://arxiv.org/abs/1606.03137)). Multi-principal assistance games already generalize this to several humans with different payoffs ([Fickinger et al., 2020, “Multi-Principal Assistance Games,” arXiv:2007.09540](https://arxiv.org/abs/2007.09540)).

### Corrections, interventions, and interruptions

A minimal edit is richer than a binary rating because it simultaneously:

1. rejects the original action;
2. supplies a nearby accepted counterfactual;
3. identifies which components changed;
4. may reveal the salient failure dimension.

Fine-grained edit supervision exploits exactly this structure ([Wu et al., 2024, “Aligning Large Language Models via Fine-grained Supervision”](https://aclanthology.org/2024.acl-short.62/)). Physical correction work likewise treats corrections as communication about objectives, while showing that unintended changes in other features create ambiguity ([Losey et al., 2022, “Physical Interaction as Communication”](https://doi.org/10.1177/02783649211050958)).

An intervention carries additional threshold information: the human believed the expected gain from taking over exceeded the intervention cost. Its timing can therefore locate a decision boundary, but only under an explicit model of observation, competence, and intervention cost. **POST-2025:** Bıyık’s review emphasizes that intervention timing and context contain information discarded when intervention is treated merely as a negative label or demonstration ([Bıyık, 2026, “Training Robots with Natural and Lightweight Human Feedback”](https://doi.org/10.1002/aaai.70037)).

There is **no defensible universal ratio** saying “one correction equals \(k\) ratings.” Information depends on dimensionality, edit locality, selection policy, noise, and whether the correction supplies a counterfactual. A pairwise label contains at most one bit, while a structured edit can carry several feature constraints; nevertheless, one broad correction can be less identifiable than a deliberately selected comparison. **UNVERIFIED:** a direct, cross-domain experiment estimating mutual information per human-second for approval, rating, edit, interruption, and latency was not located. I would check HRI, active reward learning, interactive machine teaching, and 2025–2026 agent-personalization proceedings for such a controlled comparison.

Implicit-feedback research warns that dwell time, abandonment, clicks, and non-action are not direct utilities. Position affects exposure; the system chooses what can be selected; difficult or confusing content can increase dwell time; and abandonment can mean satisfaction, distraction, or failure. Counterfactual learning-to-rank uses randomized exposure or logged propensities and inverse-propensity weighting to correct position and selection bias ([Joachims, Swaminathan & Schnabel, 2017/2018, “Unbiased Learning-to-Rank with Biased Feedback,” arXiv:1608.04468](https://arxiv.org/abs/1608.04468)). Your harness should therefore log the entire presented choice set, ordering, UI state, action proposal, and probability under the proposal policy—not merely the chosen event.

Demonstrations supply what to do but confound the demonstrator’s competence and objective; preferences compare outcomes without requiring demonstration skill but have low bandwidth; corrections supply a local improvement direction; interventions reveal both an alternative and a threshold but are selectively observed. Combining modalities is usually better than treating them as interchangeable labels ([Ibarz et al., 2018, “Reward Learning from Human Preferences and Demonstrations in Atari,” arXiv:1811.06521](https://arxiv.org/abs/1811.06521)).

## 4. Marketing, consumer psychology, and the unrevealed-intent tradition

| Method | Formal model | Single-session transfer |
|---|---|---|
| Means–end chains and laddering | Attributes \(\rightarrow\) functional/psychosocial consequences \(\rightarrow\) values; laddering repeatedly asks why an attribute matters and aggregates links into a hierarchical value map ([Gutman, 1982, “A Means-End Chain Model Based on Consumer Categorization Processes”](https://doi.org/10.1177/002224298204600207); [Reynolds & Gutman, 1988, “Laddering Theory, Method, Analysis, and Interpretation”](https://doi.org/10.1080/00218499.1988.12467766)). | Excellent ontology for your values–consequences–attributes graph, but not itself Bayesian or identifiable from passive events. Use it as a prior/schema and ask occasional “why did you change this?” anchor questions. |
| Projective techniques | Respondents interpret ambiguous stimuli, complete stories, form associations, or describe third parties; no single standard likelihood exists. Reliability and construct validity vary with coding ([France, 2024, “Consumer Research with Projective Techniques,” arXiv:2409.04995](https://arxiv.org/abs/2409.04995)). | Weak transfer. It may generate hypotheses about motives but should not update a high-stakes posterior without a validated coding model. |
| Kano | Paired functional/dysfunctional questions classify an attribute as must-be, one-dimensional, attractive, indifferent, reverse, or questionable ([Kano et al., 1984, “Attractive Quality and Must-Be Quality”](https://doi.org/10.20684/quality.14.2_147)). | Useful because omission and presence can have asymmetric effects. It is categorical rather than a cardinal preference model and needs repeated/explicit elicitation for an individual. |
| Jobs-to-be-done | A qualitative account of progress sought under particular circumstances; implementations typically combine interviews, task analysis, and importance/satisfaction scoring ([Grabowski et al., 2020, “The Quest for Innovation: Addressing User Needs and Value Creation”](https://pmc.ncbi.nlm.nih.gov/articles/PMC7540614/)). | Good vocabulary for context-specific intent; not a standardized probabilistic model. Calling a latent state a “job” does not validate its inference. |
| MaxDiff/best–worst scaling | Random-utility models infer relative utilities from the most and least preferred alternatives; one formulation chooses the pair maximizing \(u_i-u_j\) ([Marley & Louviere, 2005, “Some Probabilistic Models of Best, Worst, and Best–Worst Choices”](https://www.researchgate.net/publication/222841980_Some_Probabilistic_Models_of_Best_Worst_and_Best-Worst_Choices)). | More information per screen than one pairwise comparison, but retains menu, scale, context, and cognitive-burden assumptions. Appropriate for rare explicit calibration screens. |
| Van Westendorp | Empirical intersections of distributions for “too cheap,” “cheap,” “expensive,” and “too expensive”; it measures perceived acceptable-price ranges, not incentive-compatible WTP ([van Westendorp, 1976, “NSS: Price Sensitivity Meter”](https://ana.esomar.org/documents/nss-pricesensitivity-meter-psm-)). | Poor for passive single-session inference; hypothetical and population-oriented. |
| Gabor–Granger | Sequential purchase-intention responses at prices estimate an individual or aggregate demand curve and revenue curve ([Gabor & Granger, 1966, “Price as an Indicator of Quality”](https://www.econbiz.de/10002185228)). | Can adapt sequentially, but stated purchase intention remains hypothetical and anchoring/order-sensitive. |
| BDM | A stated bid is compared with a random selling price; truthful bidding is optimal under expected-utility and comprehension assumptions ([Becker, DeGroot & Marschak, 1964, “Measuring Utility by a Single-Response Sequential Method”](https://doi.org/10.1002/bs.3830090304)). | Stronger for real spending because it is consequential; too cumbersome for routine harness actions. |
| Attribute non-attendance | Latent-class or spike-at-zero coefficients model which attributes a respondent ignores ([Collins, Rose & Hensher, 2013, “Specification Issues in a Generalised Random Parameters Attribute Nonattendance Model”](https://www.sciencedirect.com/science/article/pii/S0191261513001318)). | Essential: absence of evidence about provenance may mean non-attendance, not indifference. With 30 observations, infer attendance only with strong shrinkage or explicit probes. |
| Latent-class segmentation | Mixture logit \(P(y)=\sum_k\pi_kP(y\mid\beta_k)\) represents segments with different preferences and price sensitivities ([Kamakura & Russell, 1989, “A Probabilistic Choice Model for Market Segmentation”](https://www.biz.uiowa.edu/faculty/grussell/PDF_%20Files/Kamakura%20and%20Russell_Prob%20Choice%20Model_JMR%201989.pdf)). | Useful as a population prior or multimodal hypothesis. A new individual’s 30 events rarely identify several classes without external population data. |

The stated–revealed gap is material but not a universal constant. Schmidt and Bijmolt’s meta-analysis of 77 studies/115 effects estimated average hypothetical WTP overstatement around 21%, with substantial moderation by method and product ([Schmidt & Bijmolt, 2020, “Accurately Measuring Willingness to Pay for Consumer Goods”](https://link.springer.com/article/10.1007/s11747-019-00666-6)). An earlier meta-analysis found median hypothetical/actual WTP of 1.35 with severe positive skew ([Murphy et al., 2005, “A Meta-Analysis of Hypothetical Bias in Stated Preference Valuation”](https://ageconsearch.umn.edu/record/14518)). These estimates justify treating costly edits, denials, and real approvals as potentially stronger evidence than survey answers, but they do not prove that every passive behavior reveals authentic preference.

## 5. Economics of revealed preference

Samuelson’s revealed-preference program replaces introspective utility with consistency restrictions on observed choices from known feasible sets ([Samuelson, 1938, “A Note on the Pure Theory of Consumer’s Behaviour”](https://www.taylorfrancis.com/chapters/edit/10.4324/9781003547983-5/note-pure-theory-consumer-behaviour-paul-samuelson)). Afriat’s theorem states, roughly, that finite price–quantity observations satisfying GARP can be rationalized by a locally nonsatiated, monotone, concave utility function; it does not uniquely recover a psychological utility function ([Afriat, 1967, “The Construction of Utility Functions from Expenditure Data,” summarized in Varian, “The Revealed Preference Approach to Demand”](https://www.revealedpreferences.org/assets/articles/RevPref.pdf)).

Therefore, observed choice licenses “chosen over an available alternative under these constraints.” It does **not** by itself license:

- cardinal intensity;
- stable values across contexts;
- preference for options never offered;
- welfare or reflective endorsement;
- causal attribution to a particular action feature;
- utility maximization when the feasible set, beliefs, information, or transaction costs are unknown.

Those limitations directly apply to approval logs. A denial reveals preference only relative to the proposal and whatever alternatives the user believed possible. An approval may mean “good enough,” “deadline dominates,” “I trust the agent,” or “review cost exceeds expected error,” not “this is my ideal action.”

GARP is especially weak when observed menus are narrow or high-dimensional: many utility functions can rationalize finite observations. **POST-2025:** Echenique et al. show that, for a fixed number of observations, GARP’s empirical content can decay rapidly as the number of goods grows ([Echenique et al., 2026, “The Empirical Content of Revealed Preference in High Dimensions,” arXiv:2605.29361](https://arxiv.org/abs/2605.29361)). Eight nominal dimensions plus context and interactions therefore require experimental variation, not merely passive rationalization.

Prospect theory assigns value to gains and losses relative to a reference point and uses nonlinear decision weights, explaining framing-dependent choices incompatible with simple expected utility ([Kahneman & Tversky, 1979, “Prospect Theory: An Analysis of Decision under Risk”](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Behavioral_Decision_Theory/Kahneman_Tversky_1979_Prospect_theory.pdf)). Loss-aversion magnitude is contested: Brown et al.’s broad meta-analysis reports mean \(\lambda=1.955\), 95% interval \([1.820,2.102]\), while Walasek et al.’s analysis restricted to individually fitted risky-choice datasets reports median \(\lambda=1.31\), 95% CI \([1.10,1.53]\), emphasizing poor data quality and heterogeneity ([Brown et al., 2024, “Meta-analysis of Empirical Estimates of Loss Aversion”](https://www.aeaweb.org/articles?id=10.1257/jel.20221698); [Walasek et al., 2024, “A Meta-analysis of Loss Aversion in Risky Contexts”](https://doi.org/10.1016/j.joep.2024.102740)).

The endowment effect is likewise design-sensitive. Kahneman, Knetsch, and Thaler found persistent WTA–WTP gaps and undertrading in mug markets; Plott and Zeiler eliminated the gap under extensive controls and argued that misconceptions could explain earlier results ([Kahneman, Knetsch & Thaler, 1990, “Experimental Tests of the Endowment Effect and the Coase Theorem”](https://doi.org/10.1086/261737); [Plott & Zeiler, 2005, “The Willingness to Pay–Willingness to Accept Gap…”](https://pubs.aeaweb.org/doi/10.1257/0002828054201387)).

Simon’s bounded-rationality model replaces global optimization with procedures compatible with limited information and computation ([Simon, 1955, “A Behavioral Model of Rational Choice”](https://academic.oup.com/qje/article-abstract/69/1/99/1919737)). For your system, that means approvals should be modeled as noisy, cost-sensitive, time-constrained decisions—not transparent readings of a fixed utility function.

## 6. Finance / market-microstructure analogy

Kyle’s model contains an informed trader, noise traders, and competitive market makers who observe only aggregate order flow. The informed trader strategically spreads trades over time because revealing information immediately worsens future trading opportunities; market makers update price from order flow, and the price-impact coefficient \(\lambda\) measures how strongly order flow changes beliefs ([Kyle, 1985, “Continuous Auctions and Insider Trading”](https://people.stern.nyu.edu/lpederse/courses/LAP/papers/Information%2CFundamental/Kyle85.pdf)).

Glosten–Milgrom models market makers updating the probability that a trade came from an informed type; bid–ask spreads compensate for adverse selection even when market makers are risk-neutral and competitive ([Glosten & Milgrom, 1985, “Bid, Ask and Transaction Prices in a Specialist Market with Heterogeneously Informed Traders”](https://doi.org/10.1016/0304-405X(85)90044-3)). PIN estimates latent information-event and informed-trading probabilities from buy/sell arrival rates ([Easley et al., 1996, “Liquidity, Information, and Infrequently Traded Stocks”](https://doi.org/10.1111/j.1540-6261.1996.tb04074.x)).

The transfer is structural:

\[
\text{latent type/preference}
\rightarrow
\text{costly strategic action}
\rightarrow
\text{noisy aggregate observation}
\rightarrow
\text{posterior update}
\rightarrow
\text{price/control response}.
\]

For a harness:

- approval/denial/edit resembles signed order flow;
- latency and interruption timing resemble arrival-time information;
- routine rubber-stamping is “noise flow” that camouflages informative decisions;
- autonomy policy is analogous to price impact because the observer’s response changes the future incentives and data-generating process;
- users may strategically edit or approve to teach, constrain, or game the model, just as an informed trader optimizes information leakage.

The analogy also warns against assigning an intrinsic weight to every event. PIN works through a generative mixture of informed and uninformed flow; your model should include latent “careful review,” “deadline approval,” “habit,” “teaching,” and “mistake” states rather than assuming every approval has the same likelihood ratio.

VPIN attempted a real-time order-flow toxicity measure, but its empirical performance became contested. Andersen and Bondarenko argued that VPIN was mechanically related to volume and volatility and did not provide the claimed flash-crash warning; Easley, López de Prado, and O’Hara disputed that interpretation ([Andersen & Bondarenko, 2014, “VPIN and the Flash Crash”](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1881731); [Easley, López de Prado & O’Hara, 2012/2014, “VPIN and the Flash Crash: A Comment”](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2062450)). The lesson is not “use VPIN,” but “a plausible latent-flow metric can be a transformation of activity intensity rather than genuine information.”

For nonstationarity, the Kalman filter exactly propagates Gaussian means/covariances in linear-Gaussian state-space systems ([Kalman, 1960, “A New Approach to Linear Filtering and Prediction Problems”](https://doi.org/10.1115/1.3662552)). Particle filters approximate nonlinear/non-Gaussian posteriors with weighted samples but suffer degeneracy and computational cost ([Gordon, Salmond & Smith, 1993, “Novel Approach to Nonlinear/Non-Gaussian Bayesian State Estimation”](https://people.bordeaux.inria.fr/pierre.delmoral/gordon-salmond-smith-1993.pdf)). BOCPD maintains a posterior over the current run length and detects abrupt parameter changes ([Adams & MacKay, 2007, “Bayesian Online Changepoint Detection,” arXiv:0710.3742](https://arxiv.org/abs/0710.3742)).

A practical design is a dynamic generalized-linear model with slow random-walk drift plus a BOCPD reset hypothesis. Do not simultaneously infer free-form drift, changepoints, rich hierarchy, and event reliabilities from 30 observations; compare a stationary model, a simple forgetting model, and a changepoint model prospectively.

## 7. Interruption, attention, and mixed-initiative interaction

This is the closest prior literature. Horvitz’s principles already call for:

- uncertainty over user goals;
- attention-aware timing;
- decisions based on context-dependent costs and benefits;
- dialogue to resolve consequential uncertainty;
- autonomy precision matched to uncertainty;
- termination, refinement, memory, and continued learning from observation.

Those principles are nearly a verbal specification of your proposal ([Horvitz, 1999, “Principles of Mixed-Initiative User Interfaces”](https://doi.org/10.1145/302979.303030)).

Lumière went further: it constructed Bayesian user models for time-varying goals from application event streams, defined transformations from raw software events to Bayesian observations, and maintained persistent user profiles ([Horvitz et al., 1998/2013, “The Lumière Project: Bayesian User Modeling for Inferring the Goals and Needs of Software Users,” arXiv:1301.7385](https://arxiv.org/abs/1301.7385)). BusyBody learned personalized models of interruption cost from computer activity, meetings, location, time, and conversation, then used those costs to mediate notifications ([Horvitz, Koch & Apacible, 2004, “BusyBody: Creating and Fielding Personalized Models of the Cost of Interruption”](https://erichorvitz.com/busybody_cscw.htm)). Attention-sensitive alerting explicitly balances interruption cost against the cost of delaying information ([Horvitz, Jacobs & Hovel, 1999/2013, “Attention-Sensitive Alerting,” arXiv:1301.6707](https://arxiv.org/abs/1301.6707)).

The established decision rule is expected value of sample information, not raw posterior entropy:

\[
\operatorname{EVSI}(q)=
\mathbb E_{z\sim p(z\mid q,H)}
\left[\max_a \mathbb E[U(a,\theta)\mid H,z]\right]
-\max_a \mathbb E[U(a,\theta)\mid H].
\]

Ask \(q\) when

\[
\operatorname{EVSI}(q)>
C_{\rm interruption}(q,c)
+C_{\rm delay}(q,a,c)
+C_{\rm privacy}(q)
+C_{\rm cognitive}(q).
\]

A utility-based mixed-initiative formulation explicitly compares the benefit of acquiring information with communication and interaction costs ([Fleming & Cohen, 2001, “A Utility-Based Theory of Initiative in Mixed-Initiative Systems”](https://citeseerx.ist.psu.edu/document?doi=98fd3d35b8b048be1b19918f2331a83aecf66b2a)).

Your “probability that information flips the decision” is a known **expected decision-change probability** or **probability of decision reversal** style heuristic, but it is not equivalent to EVSI. It ignores how costly the two actions are. A 40% chance of flipping between two harmless formatting choices can be less valuable than a 1% chance of preventing an irreversible disclosure. Use flip probability as an interpretable UI statistic; use expected regret reduction or EVSI for control.

Interruption cost is measurable and context-dependent. Bailey and Konstan found within-task interruptions caused 3–27% longer completion time, twice the errors, 31–106% more annoyance, and roughly twice the anxiety increase relative to boundary-timed presentation ([Bailey & Konstan, 2006, “On the Need for Attention-Aware Systems”](https://doi.org/10.1016/j.chb.2005.12.009)). Iqbal and Bailey found that subtask boundaries correspond to reduced workload and can support lower-cost notification timing ([Iqbal & Bailey, 2008, “Understanding Changes in Mental Workload…”](https://doi.org/10.1145/1314683.1314689)). Mark, Gudith, and Klocke found that people sometimes compensate by working faster while experiencing more stress, frustration, pressure, and effort ([Mark, Gudith & Klocke, 2008, “The Cost of Interrupted Work”](https://www.ics.uci.edu/~gmark/chi08-mark.pdf)). Simon’s attention-economics framing treats attention as the scarce resource consumed by abundant information ([Simon, 1971, “Designing Organizations for an Information-Rich World”](https://gwern.net/doc/design/1971-simon.pdf)).

**Conclusion:** the ask-versus-act control principle is established. The potentially new contribution is its coupling to production approval traces, structured action-risk features, and a user-specific preference posterior—not the decision-theoretic rule itself.

## 8. Validation without ground truth

Latent parameters are validated indirectly through prediction, calibration, generative adequacy, recovery, and interventions. Proper scoring rules such as log score and Brier score reward honest predictive distributions and jointly evaluate sharpness and calibration ([Gneiting & Raftery, 2007, “Strictly Proper Scoring Rules, Prediction, and Estimation”](https://doi.org/10.1198/016214506000001437)). Posterior predictive checks compare observed statistics—approval runs, edit sizes, latency distributions, context interactions—with replicated data from the fitted model ([Gelman, Meng & Stern, 1996, “Posterior Predictive Assessment of Model Fitness via Realized Discrepancies”](https://www3.stat.sinica.edu.tw/statistica/j6n4/j6n41/j6n41.htm)). Simulation-based calibration tests whether the inference implementation recovers calibrated posterior ranks when data are generated from the assumed model ([Talts et al., 2018, “Validating Bayesian Inference Algorithms with Simulation-Based Calibration,” arXiv:1804.06788](https://arxiv.org/abs/1804.06788)).

### Minimum credible protocol for \(n=1,\;T\approx30\)

1. **Pre-specify the ontology and observation models.** Freeze action-feature definitions and the interpretation of approval, edit, denial, latency, and interruption before evaluating predictions. Otherwise feature extraction and inference are fitted to the same 30 outcomes.

2. **Log exposure and availability.** Store every offered action/choice, ordering, reversibility, actual payload, context, and proposal probability; unoffered alternatives cannot be treated as rejected. Propensity logging is required to diagnose presentation and selection bias ([Joachims et al., 2017/2018, “Unbiased Learning-to-Rank with Biased Feedback”](https://arxiv.org/abs/1608.04468)).

3. **Use rolling, prequential prediction.** At event \(t\), predict \(y_t\) using only \(1{:}t-1\), record log loss/Brier score, then update. Compare against at least: global approval base rate, context-only logistic regression, last-event heuristic, fixed hand-written risk policy, and an unstructured per-user model.

4. **Perform synthetic parameter and model recovery.** Simulate users with known weights, context effects, drift, fatigue, and misspecification; quantify which parameters and model families can be recovered from 30 events. Parameter-recovery and confusion matrices are standard safeguards against telling psychological stories about unidentifiable estimates ([Wilson & Collins, 2019, “Ten Simple Rules…”](https://pmc.ncbi.nlm.nih.gov/articles/PMC6879303/)).

5. **Run prior-sensitivity and leave-one-event-out checks.** Show how conclusions change under wider, narrower, and skeptical priors; report posterior correlations and whether any one edit or denial drives the result.

6. **Run shuffle controls.** Permute outcomes across contexts, permute feature columns, and shift event timestamps. A useful model should lose predictive performance when the meaningful alignment is destroyed.

7. **Use posterior predictive checks.** Check approval streaks, edit sparsity, feature-specific rejection counts, latency tails, and transition frequencies, not merely mean accuracy ([Gelman et al., 1996, “Posterior Predictive Assessment…”](https://www3.stat.sinica.edu.tw/statistica/j6n4/j6n41/j6n41.htm)).

8. **Conduct a prospective decision test.** On matched low-risk cases, compare the uncertainty controller with a fixed approval policy. Measure predictive log loss, unnecessary-question rate, correction rate after autonomous action, delay, and severity-weighted regret. Randomize only within actions already authorized as safe.

Thirty events cannot establish calibration through a conventional reliability diagram: there are too few observations per probability bin. Report cumulative proper scores and prediction intervals, then aggregate calibration across many independent sessions while retaining per-user evaluation. A hostile reviewer would demand preregistration, many users, repeated or crossed contexts, time-based holdouts, no feature/outcome leakage, logged exposure probabilities, blinded outcome coding, safety-stratified errors, ablation of each event channel, and prospective evidence that asking policy improves utility rather than merely predicting approvals.

The minimum honest claim after one 30-event session is “the model made better sequential predictions than specified baselines on this session.” It is not “we recovered the user’s values” or “the posterior is calibrated.”

## 9. Honest gap analysis

### Already done

- Inferring time-varying user goals from software event streams with Bayesian models: Lumière ([Horvitz et al., “The Lumière Project”](https://arxiv.org/abs/1301.7385)).
- Deciding whether and when to interrupt from expected costs and benefits: attention-sensitive alerting, BusyBody, and mixed-initiative decision theory ([Horvitz, 1999, “Principles of Mixed-Initiative User Interfaces”](https://doi.org/10.1145/302979.303030); [Horvitz et al., “Attention-Sensitive Alerting”](https://arxiv.org/abs/1301.6707)).
- Inferring rewards online while an assistant acts: cooperative IRL/assistance games ([Hadfield-Menell et al., 2016, “Cooperative IRL”](https://arxiv.org/abs/1606.03137)).
- Learning personalized reward/policy models from implicit or explicit per-user feedback: P-RLHF, variational preference learning, PAL, and heterogeneous-feedback RLHF ([Li et al., 2024, “Personalized Language Modeling…”](https://arxiv.org/abs/2402.05133); [Poddar et al., 2024, “Variational Preference Learning”](https://arxiv.org/abs/2408.10075); [Chen et al., 2024, “PAL,” arXiv:2406.08469](https://arxiv.org/abs/2406.08469)).
- Detecting corrections in assistant interaction and using production conversational failures as feedback: SAIF and Alexa self-learning ([Dinkar et al., 2020, “SAIF: A Correction-Detection Architecture for Personal Assistants”](https://pmc.ncbi.nlm.nih.gov/articles/PMC7582502/); [Ponnusamy et al., 2020, “Feedback-Based Self-Learning in Large-Scale Conversational AI Agents”](https://ojs.aaai.org/index.php/AAAI/article/view/7022)).
- Multi-objective and hierarchical reward representations: ArmoRM and ALaRM ([Wang et al., 2024, “Interpretable Preferences…”](https://aclanthology.org/2024.findings-emnlp.620/); [Lai et al., 2024, “ALaRM”](https://aclanthology.org/2024.findings-acl.465/)).

**POST-2025:** the neighboring frontier is already moving directly toward continual per-user agents. PAHF learns online from live interaction using explicit per-user memory and evaluates adaptation to preference shifts ([2026, “Learning Personalized Agents from Human Feedback,” arXiv:2602.16173](https://arxiv.org/abs/2602.16173)). Adaptive querying work now chooses among approval and corrective formats based on informativeness and user effort ([2026, “Adaptive Querying for Reward Learning from Human Feedback”](https://pmc.ncbi.nlm.nih.gov/articles/PMC12935605/)). These works substantially reduce the novelty of “an agent learns one user’s preferences online.”

### What remains plausibly novel

The potentially defensible system contribution is the conjunction of:

1. production-native approval records rather than a purpose-built preference survey;
2. typed event likelihoods for approval, denial, minimal edit, rerun, interruption, and latency;
3. explicit proposed-action features tied to operational risk;
4. a structured attributes–consequences–values posterior with uncertainty and provenance;
5. a decision-theoretic autonomy controller operating inside the same harness.

That is integration and substrate novelty, not new inference mathematics.

The approval queue is plausibly a valuable elicitation instrument because it contains consequential, contextualized decisions on real proposed actions, and because edits produce local counterfactuals. It is not automatically “high quality”: the system chooses the proposals; approvals are selectively observed; users satisfice; latency is confounded; repeated review causes fatigue; and the user may deliberately teach or game the learner. **POST-2025:** “Habituation at the Gate” reports increasing approval and declining scrutiny across AI-code review episodes, directly challenging stationarity and the interpretation of approval as careful endorsement ([2026, “Habituation at the Gate: Rising Approval and Declining Scrutiny in Human Review of AI Agent Code,” arXiv:2606.22721](https://arxiv.org/abs/2606.22721)).

**UNVERIFIED:** I did not locate a peer-reviewed paper that specifically treats a general-purpose production agent harness’s approval queue—including edits, reruns, interruptions, latency, action-risk features, and audit provenance—as a Bayesian means–end preference instrument that controls future autonomy. Absence was not established. Before asserting novelty, search ACM IUI/CHI/UIST/CSCW, HCOMP, HRI, RecSys, NeurIPS preference-learning workshops, 2025–2026 agent-personalization proceedings, patents, and production documentation using “approval trace,” “human-in-the-loop workflow learning,” “adaptive autonomy from approvals,” “approval fatigue,” and “agent feedback memory.”

The honest novelty sentence is therefore: *We operationalize established Bayesian user modeling and value-of-information control on a newly important data substrate: the typed approval and correction traces already emitted by production agent harnesses.*

## 10. Deeper ideas we have not thought of

### 10.1 Model whether review occurred, not just the decision

An approval likelihood should factor as

\[
P(y\mid\theta)=
\sum_{r\in\{\text{careful},\text{cursory},\text{unseen}\}}
P(y\mid\theta,r)\,P(r\mid c,\text{latency},\text{queue load}).
\]

This imports the market-microstructure distinction between informed and noise flow and addresses approval habituation ([Easley et al., 1996, “Liquidity, Information, and Infrequently Traded Stocks”](https://doi.org/10.1111/j.1540-6261.1996.tb04074.x); **POST-2025:** [“Habituation at the Gate,” 2026](https://arxiv.org/abs/2606.22721)). Design consequence: confidence should fall when approvals become faster, queues grow, or scrutiny proxies deteriorate; a streak of rubber stamps must not automatically expand autonomy.

### 10.2 Treat feature extraction as uncertain

“Public,” “reversible,” “audience size,” “provenance,” and “scope” are themselves model outputs or estimates. Updating preferences as though these features were known causes errors in the action parser to masquerade as preference evidence. Hidden-context preference learning shows that omitted or misrepresented context changes the aggregation rule and inferred preference ([Siththaranjan et al., 2023, “Distributional Preference Learning”](https://arxiv.org/abs/2312.08358)). Design consequence: maintain \(p(\phi(a)\mid\text{proposal})\), propagate it into \(p(y\mid\theta)\), and display “uncertain because audience size is unknown” rather than only “user preference uncertain.”

### 10.3 Separate temporal credit assignment from preference inference

An edit to a final email may correct the recipient, an upstream source, the agent’s reasoning, or prose style. Assigning it wholly to action features creates false preferences. Human-feedback RL already recognizes credit assignment as a central unresolved issue ([Griffith et al., 2013, “Policy Shaping: Integrating Human Feedback with Reinforcement Learning”](https://www.cs.cmu.edu/~jeanoh/16-785/papers/griffith-nips2013-policyshaping.pdf)). Design consequence: represent a causal trace from sources and tool calls to proposal fields, and ask one low-cost attribution question when several upstream causes are plausible.

### 10.4 Autonomy creates selective-label feedback

Once the system acts autonomously on “easy” cases, labels remain only for uncertain or risky cases. The observed approval rate will then deteriorate even if performance improves, and the model can become miscalibrated because its training distribution is policy-selected. Counterfactual learning-to-rank shows why logged propensities are necessary under policy-controlled exposure ([Joachims et al., 2017/2018, “Unbiased Learning-to-Rank with Biased Feedback”](https://arxiv.org/abs/1608.04468)). Design consequence: log the probability of asking, retain occasional randomized audit reviews among safe autonomous actions, and evaluate with inverse-propensity or doubly robust estimators.

### 10.5 Learn thresholds before semantic values

With 30 observations, a model may reliably learn “ask before public actions above \$50” while being unable to identify whether the underlying value is privacy, reputation, or frugality. Revealed-preference theory licenses the behavioral boundary but not the psychological interpretation ([Samuelson, 1938, “A Note on the Pure Theory…”](https://www.taylorfrancis.com/chapters/edit/10.4324/9781003547983-5/note-pure-theory-consumer-behaviour-paul-samuelson); [Afriat/Varian, “The Revealed Preference Approach to Demand”](https://www.revealedpreferences.org/assets/articles/RevPref.pdf)). Design consequence: expose two layers—well-validated operational thresholds and explicitly tentative value labels. Promote a value label only after targeted “why” anchors.

### 10.6 Optimize information per attention-second, not per event

Event types should not receive fixed weights. Rank possible observations by

\[
\frac{\mathbb E[\text{decision-regret reduction}]}
{\mathbb E[\text{attention cost}+\text{delay cost}]},
\]

which combines active experimental design with attention economics ([Houlsby et al., 2011, “Bayesian Active Learning…”](https://arxiv.org/abs/1112.5745); [Simon, 1971, “Designing Organizations for an Information-Rich World”](https://gwern.net/doc/design/1971-simon.pdf)). Design consequence: sometimes ask a binary choice, sometimes request a minimal edit, sometimes wait for passive evidence, and sometimes use a reversible probe. Measure empirical information gain and burden for each modality.

### 10.7 Use a “no precedent” flag

Some approvals are exceptions caused by emergencies, relationships, or deadlines and should not update general policy. Context-dependent and latent-class choice models show that pooling such observations changes the inferred population or individual parameters ([Kamakura & Russell, 1989, “A Probabilistic Choice Model for Market Segmentation”](https://www.biz.uiowa.edu/faculty/grussell/PDF_%20Files/Kamakura%20and%20Russell_Prob%20Choice%20Model_JMR%201989.pdf)). Design consequence: let the user approve while marking “one-off”; model it as a context-specific observation with reduced transfer, not as a global preference reversal.

### 10.8 Distinguish “safe to learn” from “permitted to do”

A posterior over taste must not override organizational rules, legal requirements, or explicit authority. Constitutional AI illustrates a separate rule/principle layer rather than deriving every constraint from preference data ([Bai et al., 2022, “Constitutional AI: Harmlessness from AI Feedback,” arXiv:2212.08073](https://arxiv.org/abs/2212.08073)). Design consequence: use a lexicographic controller:

1. reject actions violating hard rules or delegated authority;
2. require approval for mandated categories;
3. only then optimize personal expected utility/EVSI.

This prevents repeated unsafe approvals from teaching the agent that a non-waivable rule is merely a weak preference.

### 10.9 Audit preference pollution as a causal outcome

The assistant’s suggestions can anchor ratings and alter later choices; a model can therefore become accurate about preferences it helped create. Recommender research formalizes performative prediction and induced preference shifts ([Perdomo et al., 2020, “Performative Prediction”](https://proceedings.mlr.press/v119/perdomo20a.html); [Carroll et al., 2022, “Estimating and Penalizing Induced Preference Shifts in Recommender Systems”](https://proceedings.mlr.press/v162/carroll22a.html)). Design consequence: preserve a timeline of model predictions, explanations, displayed defaults, and subsequent choices; compare preference drift under different presentation policies; offer the user a frozen baseline and deletion/reset controls.

### 10.10 Treat confidence as a safety-critical actuator

Posterior confidence changes autonomy, autonomy changes which labels are observed, and those labels change confidence. This closed loop can self-confirm: fewer questions produce fewer contradictions, making the model appear certain. Performative prediction shows that deployed predictions alter their target distribution ([Perdomo et al., 2020, “Performative Prediction”](https://proceedings.mlr.press/v119/perdomo20a.html)). Design consequence: cap autonomy growth, require independent audit evidence, and distinguish epistemic confidence from “lack of recent contradiction.”

# What to say to an ML-literate judge

### Three defensible sentences

1. **“Canonical RLHF usually fits a point-valued scalar reward from pooled pairwise preferences; our deployment-time model instead maintains a per-user posterior over interpretable action attributes and updates it from several naturally occurring feedback modalities.”** Licensed by [Ouyang et al., 2022, “Training Language Models to Follow Instructions with Human Feedback”](https://arxiv.org/abs/2203.02155), and [Siththaranjan et al., 2023, “Distributional Preference Learning”](https://arxiv.org/abs/2312.08358).

2. **“The inference and ask-versus-act mathematics are established Bayesian user-modeling and value-of-information ideas; our proposed contribution is applying them to the typed approval, edit, rerun, interruption, and latency traces emitted by a production agent harness.”** Licensed by [Horvitz, 1999, “Principles of Mixed-Initiative User Interfaces”](https://doi.org/10.1145/302979.303030), and [Horvitz et al., “The Lumière Project”](https://arxiv.org/abs/1301.7385).

3. **“The controller asks only when the expected decision benefit of additional information exceeds interruption and delay costs, while hard safety and authority rules remain outside the learned preference model.”** Licensed by [Horvitz et al., “Attention-Sensitive Alerting”](https://arxiv.org/abs/1301.6707), and [Bai et al., 2022, “Constitutional AI”](https://arxiv.org/abs/2212.08073).

### Three overclaims to avoid

1. **Avoid: “We replace RLHF.”** DPO, personalized RLHF, distributional preference learning, multi-objective rewards, and online preference optimization already modify or remove canonical reward models; your system addresses online personalization and control, not the entire training pipeline ([Rafailov et al., 2023, “DPO”](https://arxiv.org/abs/2305.18290); [Poddar et al., 2024, “Variational Preference Learning”](https://arxiv.org/abs/2408.10075)).

2. **Avoid: “We recover the user’s true latent values from 30 interactions.”** IRL rewards and conjoint part-worths are generally non-unique without variation, anchors, behavioral assumptions, and recovery tests ([Ng & Russell, 2000, “Algorithms for IRL”](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf); [Wilson & Collins, 2019, “Ten Simple Rules…”](https://pmc.ncbi.nlm.nih.gov/articles/PMC6879303/)).

3. **Avoid: “Our flip-probability rule is a new optimal autonomy law.”** It is a risk-insensitive approximation to established expected-value-of-information control and ignores consequence magnitude and interruption cost ([Horvitz, 1999, “Principles of Mixed-Initiative User Interfaces”](https://doi.org/10.1145/302979.303030); [Fleming & Cohen, “A Utility-Based Theory of Initiative”](https://citeseerx.ist.psu.edu/document?doi=98fd3d35b8b048be1b19918f2331a83aecf66b2a)).
