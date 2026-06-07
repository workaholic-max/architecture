---
name: create-domain
description: Add or extend a user-facing domain in this Vue application architecture while preserving route ownership, API boundaries, permissions, colocated tests, and SCSS conventions.
---

# Create Domain

Use this skill when adding a new domain under `src/domains` or expanding an existing domain with views, routes, stores,
API calls, types, mocks, permissions, or tests.

## Workflow

1. Confirm the domain is a user-facing product area, not only a backend entity.
2. Follow `ARCHITECTURE.md` and the existing domain structure:
    - `routes`
    - `views`
    - `types`
    - `api.ts`
    - optional `stores`, `mocks`, `configs`, `enums`, `utils`, `composables`, `components`, `tests`
3. Add route names as constants and expose route records from the domain route entry point.
4. Compose the domain route from `src/router/routes.ts` only through the domain route export.
5. Keep cross-domain imports one-directional and intentional.
6. Add or update permission metadata when access control matters.
7. Use SCSS aliases for component styles.
8. Add focused tests for stores, composables, route permissions, or component behavior when logic is introduced.

## Verification

Run the narrowest relevant checks first. For shared route, permission, or API changes, run lint, tests, and a build
before finishing.
