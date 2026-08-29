# Vendored harness skills & subagents (attribution)

These are **harness tooling** that guides the assistant during the build. They are
**not product code** and are not part of the demo. All product/application code in
this repo is our own work, built during the Agent Harness Hackathon on 2026-08-29.

| Artifact | Origin | License |
|---|---|---|
| `skills/frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) (first-party) | Apache-2.0, per-skill `LICENSE.txt` |
| `skills/webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills) (first-party) | Apache-2.0, per-skill `LICENSE.txt` |
| `skills/motion-foundations` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | MIT |
| `skills/motion-patterns` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | MIT |
| `skills/make-interfaces-feel-better` | [affaan-m/ECC](https://github.com/affaan-m/ECC) (community PR #1659 by `linus707`) | MIT |

Our own, carried in from the FounderOS harness (same author): skills `code-review`,
`security-review`, `run-and-verify`, `tdd-cycle`, `implementation-plan`, `debugging`;
subagents `code-reviewer`, `security-reviewer`, `frontend-engineer`, `backend-engineer`,
`debugger`.

**Copied, not symlinked** — deliberately. The predecessor repo symlinked these into a
sibling checkout; every link broke when that checkout moved, and would have been dead
for anyone cloning the public repo.
