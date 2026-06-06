# AGENTS.md

Repository guidance for AI coding agents working in this Vue architecture template.

## Operating Principles

- Treat this repository as a reference architecture first and a demo application second.
- Keep the architecture readable, predictable, and easy to explain to another senior frontend engineer.
- Ask concise questions when a decision changes the public architecture, dependency set, or template philosophy.
- Make reasonable local implementation choices when the existing code clearly establishes a pattern.
- Prefer small, reviewable changes over broad rewrites.
- Do not push, publish, merge, or create pull requests unless explicitly asked.

## Cost And Context Control

- Read the smallest useful set of files before editing.
- Prefer `rg` / `rg --files` for search.
- Do not bulk-load generated files, lockfiles, build output, or large docs unless directly relevant.
- Keep always-on guidance concise. Move long procedures into docs or skills.
- Run focused checks for narrow changes; run the full suite when architecture, tooling, dependencies, or shared behavior
  changes.

## Project Shape

- Runtime stack: Vue 3, Vite, TypeScript, Pinia, Vue Router, Axios.
- Styling baseline: SCSS with centralized variables, mixins, functions, and global base styles.
- Package manager: pnpm.
- Source root: `src`.
- Main architectural layers: `app`, `router`, `api`, `domains`, `features`, `shared`.
- Architectural boundaries are supported by ESLint import rules and documented project conventions. Do not bypass them.

## Commands

- Install: `pnpm install`
- Local dev: `pnpm watch`
- Type check: `pnpm type:check`
- Lint: `pnpm lint:check`
- Format check: `pnpm format:check`
- Tests: `pnpm test`
- Local production-style build: `pnpm build-local`

Before finishing code changes, run the smallest reliable verification set and report exactly what was run.

## Architecture Rules

- `app` is the top of the dependency graph and is imported only by `src/main.ts`.
- `domains` own user-facing product areas and may depend on other domains only through intentional one-way
  relationships.
- `features` own reusable concerns and must not import from `domains`.
- `shared` is for genuinely reused or application-wide concerns, not for code with unclear ownership.
- `api` is the single visible surface for backend and external-service interaction.
- Route metadata is the source of truth for page-level titles and permissions.
- Tests are colocated with the layer or module they verify.

## Styling Rules

- Use existing SCSS aliases for shared style resources: `@scss-vars`, `@scss-mixins`, `@scss-functions`.
- Prefer scoped component styles unless a style is intentionally global.
- Future theme work should prefer runtime CSS variables for colors so light/dark mode works reliably.

## AI Files

- `AGENTS.md`: shared source of truth for agent behavior.
- `CLAUDE.md`: Claude Code bridge that imports `AGENTS.md`.
- `.github/copilot-instructions.md`: GitHub Copilot bridge and summary.
- `docs/ai-agents.md`: human-readable explanation of the AI setup.
- `.agents/skills`: repo-scoped Codex skills for repeatable workflows.

To remove the AI layer from a cloned project, delete those files and folders. They do not affect runtime code.
