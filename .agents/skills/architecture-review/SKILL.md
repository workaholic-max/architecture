---
name: architecture-review
description: Review a proposed or completed change against this Vue architecture template, focusing on layer boundaries, ownership, dependency direction, tests, and template reusability.
---

# Architecture Review

Use this skill when reviewing changes to architecture, routing, API structure, shared modules, styling conventions,
tests, tooling, or template direction.

## Workflow

1. Read `AGENTS.md` and the relevant README sections.
2. Inspect the changed files or the files mentioned by the user.
3. Check layer ownership:
    - `app` remains startup-only.
    - `features` do not import `domains`.
    - `shared` is used for real reuse or application-wide concerns.
    - route metadata remains the page-level source of truth.
4. Check whether the change increases template clarity or only adds demo-specific weight.
5. Verify imports follow configured aliases and extension rules.
6. Recommend focused tests when behavior changed.

## Output

Start with findings ordered by severity. Include file paths and concrete reasoning. If no issues are found, say that
clearly and mention remaining risk or test gaps.
