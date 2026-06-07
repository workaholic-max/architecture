---
name: architecture
description: Use the documented Vue application architecture when planning or implementing changes that involve layer ownership, dependency direction, routing, API boundaries, styling conventions, or tests.
---

# Architecture

Use this skill when a task needs architectural context before changing code.

## Workflow

1. Read `AGENTS.md` for agent behavior and project commands.
2. Read the relevant sections of `ARCHITECTURE.md` for layer ownership, dependency rules, routing, API, styling, tests,
   and implementation conventions.
3. Build product behavior inside the documented structure unless the user explicitly asks to change the architecture.
4. Keep dependencies moving in the intended direction:
    - `app` may compose application layers, but other layers do not import from `app`.
    - `features` do not import from `domains`.
    - `domains` may depend on other domains only when the relationship is intentional and one-way.
    - `shared` is for meaningful reuse or application-wide concerns, not unclear ownership.
5. Add or update tests next to the module or layer they verify when logic changes.

## Output

Explain architectural choices briefly when they affect layer ownership, public APIs, route metadata, dependency
direction, shared modules, or test placement.
