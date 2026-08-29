---
name: security-review
description: Security audit of code, dependencies, or the agent harness itself (settings, hooks, skills, MCP configs, prompt-injection surfaces). Use before releases, after dependency changes, when handling user data, or on a schedule.
---

# Security Review

## Purpose
Concrete, exploitable-here findings — for both the future product and the harness that builds it.

## Workflow
1. Define scope with the human: `harness` | `code` | `dependencies` | `all`.
2. Delegate the audit to the `security-reviewer` subagent (opus) with the scope.
3. **Harness scope** additionally covers (AgentShield-inspired checklist, project-local):
   - permission rules: broad allows, missing denies, bypass modes
   - hook scripts: injection, fail-open appropriateness, self-test passing (`python3 .claude/hooks/bash_guard.py --self-test`)
   - skills/agents/CLAUDE.md/AGENTS.md: prompt-injection surfaces, over-granted `allowed-tools`
   - tracked files + memory: secret patterns (`sk-`, `ghp_`, `AKIA`, `BEGIN.*PRIVATE KEY`, etc.), `.gitignore` coverage
4. **Dependency scope** (when deps exist): lockfile review, install scripts, typosquat check, known-vuln audit using the stack's real tool (`npm audit` / `pip-audit` / etc. — only if installed; never invent output).
5. Walk findings with the human; fixes go through normal review; re-verify fixed items.

## Required evidence
`file:line` per finding; command output for any tool-based claims; explicit "not reviewed" list.

## Stop conditions
- CRITICAL finding → stop other work, surface immediately.
- An audit tool isn't installed → report the gap; installing it requires approval.

## Output format
Severity-ordered findings (CRITICAL→INFO): impact, evidence, minimal fix. Plus scope-reviewed and not-reviewed lists. Never the word "secure" — only "no findings at <severity> in scope".

## Memory updates
Real findings → `memory/failures.md` or `memory/learnings.md`; audit date + scope → `memory/agent-retrospectives.md`.
