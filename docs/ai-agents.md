# AI Agents

This repository includes AI guidance by default because the project is intended to be reused, inspected, and extended
with coding agents.

The AI layer is documentation and workflow only. It does not affect the runtime bundle, Vite build, lint rules, tests,
or application architecture.

## Files

- `AGENTS.md` is the shared source of truth for AI coding agents.
- `CLAUDE.md` imports `AGENTS.md` so Claude Code reads the same guidance without duplicated content.
- `.github/copilot-instructions.md` gives GitHub Copilot a repository-level bridge and short project summary.
- `.agents/skills` contains repo-scoped Codex skills for repeatable architecture workflows.

## Design Goals

- Reduce repeated explanation of the architecture.
- Keep agent context cost low by keeping always-loaded files concise.
- Make agents ask questions when a decision changes architecture, dependencies, or public template direction.
- Keep deterministic workflows in skills or docs instead of large always-loaded instruction files.
- Make the AI layer removable without touching source code.

## Removal

If a cloned project does not want checked-in AI guidance, remove:

```text
AGENTS.md
CLAUDE.md
.github/copilot-instructions.md
docs/ai-agents.md
.agents/
```

No runtime code depends on those files.

## Maintenance

- Keep `AGENTS.md` below roughly 200 lines.
- Prefer links to deeper docs over repeating long explanations.
- Move task-specific workflows into `.agents/skills`.
- Review AI guidance after major architecture, tooling, or command changes.
- Avoid contradictory instructions between AI files.
- Use `CLAUDE.local.md` for private Claude Code notes; it is intentionally ignored by git.
