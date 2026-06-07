# GitHub Copilot Instructions

Follow `AGENTS.md` as the repository source of truth. This file exists so Copilot Chat, Copilot code review, and Copilot coding agents can discover the same project expectations.

## Core Rules

- Preserve the Vue/Vite architecture boundaries described in `ARCHITECTURE.md` and `AGENTS.md`.
- Keep changes small, typed, and aligned with the existing layer ownership.
- Use pnpm scripts from `package.json`; do not invent parallel command flows.
- Prefer focused verification first, then broader checks when shared behavior or tooling changes.
- Do not introduce runtime dependencies, styling systems, or new infrastructure without explicit task scope.
- Do not push, merge, publish, or open pull requests unless the user asks for that action.

## Fast Orientation

- App startup lives in `src/app`.
- Routes and guards live in `src/router`.
- Backend-facing resources are surfaced through `src/api`.
- Product areas live in `src/domains`.
- Reusable feature concerns live in `src/features`.
- Cross-cutting shared modules live in `src/shared`.
- Base styling lives in `src/assets/styles`.

When unsure, ask a concise question before changing documented architecture or project direction.
