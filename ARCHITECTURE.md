# Architecture Guide

This document is the architectural contract for a Vue application. It defines ownership, dependency direction,
composition points, configuration, and verification. It is intentionally independent of product examples and of
optional facilities such as a styling system, icon renderer, or Progressive Web App support.

Folders described as optional are capabilities, not a checklist. Create one only when its owner has code of that kind.

### How to Read This Guide

- Statements using **must** or **never** define boundaries that code and tooling are expected to preserve.
- Statements using **may**, **can**, or **optional** describe supported shapes, not required folders.
- The creation guides under [`docs/`](docs/README.md) apply this contract to common development tasks.
- The files under [`references/`](references/README.md) are supplementary and cannot override this contract.
- When the contract changes, update its documentation, examples, aliases, lint rules, and tests together.

---

## Principles

- Organize product code by ownership and responsibility, not only by technical type.
- Keep dependencies directional and prohibit file-level cycles.
- Compose application-wide behavior at explicit entry points.
- Keep route metadata and external-service registration discoverable.
- Prefer explicit imports and small public surfaces over hidden coupling.
- Add abstractions when they express real reuse or ownership, not to make folder trees symmetrical.
- Enforce mechanical rules with tools and preserve design decisions through review.

---

## Project Map

```text
src/
├─ app/       application composition and startup
├─ api/       transport client and external-service aggregation
├─ domains/   navigable product areas and business rules
├─ features/  reusable product capabilities
├─ router/    route composition and navigation policy
├─ shared/    reusable primitives and cross-cutting modules
├─ assets/    source-controlled assets processed by the build
└─ main.ts    application entry point

configuration/  reusable build and lint configuration fragments
docs/           portable creation and verification guides
references/     optional implementation provenance and notes
tests/          global test setup only
```

The top-level shape is stable. Structures inside a layer remain demand-driven.

---

## Dependency Model

This is a directed ownership model rather than a strict foundational pyramid. Most dependencies point from application
composition and product areas toward reusable capabilities. A small number of documented composition points
intentionally aggregate modules from several areas.

| Importing area    | May depend on                                                       | Restrictions                                                                          |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| application entry | `app` and global assets                                             | It creates and starts the application.                                                |
| `app`             | every lower area                                                    | No lower area may import `app`.                                                       |
| `router`          | domain route exports, router-local modules, shared modules          | Domains do not own the final route tree.                                              |
| API aggregation   | the client, cross-cutting resources, domain and feature API modules | Aggregation does not transfer ownership of operations.                                |
| `domains`         | shared modules, features, API infrastructure, justified domains     | Cross-domain dependencies must be one-directional.                                    |
| `features`        | shared modules, API infrastructure, independent features            | Features must never import domains.                                                   |
| `shared`          | reusable modules and intentional application-wide aggregations      | It never imports `app`; any broader knowledge must have a clear coordinating purpose. |

Every area may use external packages. Permission to import something does not make the dependency appropriate:
ownership and cohesion still decide where it belongs.

File-level circular dependencies are forbidden everywhere. Two domains must also avoid conceptual two-way coupling,
even when their individual files do not form a detectable cycle. Extract a smaller feature or shared contract when two
areas would otherwise need each other.

---

## Application Composition: `app/`

`app/` owns the application shell, bootstrapping, and startup sequence. It is imported once by the application entry
and may import all lower areas; lower areas never import it.

Application-local capabilities can include `components/`, `init/`, `services/`, `configs/`, `utils/`, `enums/`, and
`composables/`. They remain here when they are meaningful only during application composition.

### Initialization

The entry point creates the application, calls one initialization function, and mounts only after required synchronous
setup has completed.

```text
app/init/
├─ fragments/
│  ├─ packages.*
│  ├─ state.*
│  └─ services.*
└─ index.*
```

A typical order is:

1. install state management;
2. initialize and register the router;
3. configure third-party packages;
4. initialize runtime services.

The order is part of the contract: guards may need stores, and startup services may need a registered router. Keep
order-dependent steps visible in the initialization entry point.

Independent services may be discovered by a `*.service.ts` or `*.service.js` naming convention and initialized when
they expose `init()`. Discovery removes a manual registry, but a misnamed file is silently excluded and discovery order
must not be used to express dependencies. Register ordered services explicitly.

This convention is based on the
[Dev Lab application-initialization pattern](https://github.com/workaholic-max/dev-lab/tree/main/code/application-init).

---

## Product Domains: `domains/`

A domain owns a coherent user-facing product area: its pages, business rules, state, external operations, and local
components. It does not need to map one-to-one to a backend entity.

```text
domains/<domain-name>/
├─ routes/       baseline route records and names
├─ views/        baseline route-level screens
├─ api.ts        optional domain-owned external operations
├─ components/   optional domain-wide components
├─ composables/  optional reactive coordination
├─ configs/      optional rules and configuration
├─ enums/        optional closed vocabularies
├─ layouts/      optional domain layouts
├─ mocks/        optional test or development data
├─ services/     optional runtime capabilities
├─ stores/       optional domain state
├─ tests/        optional colocated tests
├─ types/        optional domain contracts
└─ utils/        optional stateless logic
```

Routes and at least one route-level view are the baseline because a domain is navigable. Supporting components used by
one view may live beside it; components reused throughout the domain belong at the domain root.

Route names are globally unique and should be prefixed by their domain. A domain exports route records, but the router
owns their final composition. A domain may depend on another domain only when that direction expresses a real product
relationship and does not create reverse coupling.

See [Adding a Domain](docs/new-domain.md) for the creation workflow.

---

## Reusable Features: `features/`

A feature owns a reusable product capability with a domain-independent contract. Domains and higher composition layers
consume it; it never imports a domain.

```text
features/<feature-name>/
├─ api.ts
├─ components/
├─ composables/
├─ configs/
├─ enums/
├─ layouts/
├─ mocks/
├─ services/
├─ stores/
├─ tests/
├─ types/
└─ utils/
```

All entries are optional. A feature commonly begins with one useful contract—a composable, store, service, utility, or
component group—and grows only as its responsibility grows. Features do not own route-level views or route
registration.

If behavior is meaningful only inside one product area, keep it in that domain. If a proposed feature needs a domain
type or rule, pass a smaller generic contract or reconsider its ownership; do not move domain concepts into `shared`
merely to make an import compile.

See [Adding a Feature](docs/new-feature.md) for the creation workflow.

---

## Shared Capabilities: `shared/`

`shared/` owns reusable primitives and cross-cutting modules. It may include `components/`, `composables/`, `configs/`,
`controls/`, `directives/`, `enums/`, `icons/`, `layouts/`, `services/`, `stores/`, `tests/`, `types/`, and `utils/`.

`shared` is intentionally not treated as a perfectly isolated bottom layer. Alongside domain-independent primitives,
it may contain an application-wide coordinator that knows about routes, permissions, or product contracts when no
narrower owner can perform that coordination. Such knowledge must be deliberate, one-directional, and cycle-free.

Do not use `shared` as a temporary home for code with unclear ownership. A module belongs here only when it is genuinely
reusable or centralizes a cross-cutting concern.

### Environment Configuration

Client environment access is centralized in a typed shared configuration module. Application code reads that module
instead of scattering `import.meta.env` access through the source tree.

- Declare client variables in the environment type file.
- Use the build tool's required public prefix, such as `VITE_`.
- Document required names in `.env.example` without committing real values.
- Mirror environment files locally or in deployment configuration; keep them out of version control.
- Treat every variable embedded in a browser bundle as public. API keys that must remain secret belong on a server,
  regardless of the variable name.

---

## External Communication: `api/`

`api/` owns transport infrastructure and the discoverable external-service surface.

```text
api/
├─ client.*      configured transport and common request behavior
├─ index.*       aggregation of externally callable modules
├─ resources/    cross-cutting operations with no domain or feature owner
└─ types/        transport-specific contracts
```

Domain- and feature-specific operations stay in their owner's `api.ts`; the API entry point may re-export them without
taking ownership. This separates operation ownership from discoverability.

The client centralizes the base URL, credentials, headers, serialization, cancellation, and truly global response
behavior. Business-specific error handling remains at the call site or in the owning area. Requests should return
typed data rather than leaking the transport library's full response shape through product code.

When requests are cancellable, cancellation has two layers:

- the client creates and exposes a cancellation mechanism per request;
- a component-scoped composable tracks requests and cancels pending work on unmount.

Intentional cancellation and genuine failure must remain distinguishable. A cancelled request may resolve to a known
sentinel such as `null`; other failures continue to reject.

The single-client and abortable-request conventions are based on
[Dev Lab's Axios client](https://github.com/workaholic-max/dev-lab/tree/main/code/axios-api-client) and
[abortable request tracking](https://github.com/workaholic-max/dev-lab/tree/main/code/use-abortable-request).

---

## Navigation: `router/`

`router/` owns route composition and system-level navigation behavior.

```text
router/
├─ composables/  reusable route resolution helpers
├─ enums/        optional router-wide names and patterns
├─ fallback/     system routes and always-available fallback views
├─ guards/       ordered navigation policies
│  ├─ fragments/
│  └─ index.*
├─ init/         router lifecycle registration
│  ├─ fragments/
│  └─ index.*
├─ tests/        guard and navigation-policy tests
├─ types/        route metadata and guard contracts
├─ utils/        route persistence and permission helpers
├─ index.*       router instance
└─ routes.*      final route tree
```

### Route Composition and Metadata

Each domain owns and exports its route records. The central route module combines them with system fallbacks and may
nest domain routes without changing ownership of their source files.

Route metadata is the source of truth for page-level information such as titles and permission requirements.
Navigation configuration references route names and resolves metadata through the router instead of duplicating paths,
titles, or access rules. Product views are lazy-loaded; small system fallbacks may remain eager so an error state does
not depend on another dynamic request.

### Guards

Guards are small policy fragments evaluated in a declared order. A guard contract distinguishes three outcomes:

- `null` — no decision; continue to the next guard;
- `true` — explicitly accept and stop;
- a route location — redirect and stop.

The resolver adapts those outcomes to the router's expected return value. Authentication runs before authorization
when authorization assumes an authenticated account. Whether same-name navigation should skip guard evaluation is a
product policy; if used, document it because parameter or query changes will not trigger revalidation.

### Router Initialization

One initialization function registers lifecycle hooks and installs the router:

- `beforeEach` runs guards and optional first-navigation restoration;
- `afterEach` records successful navigation state or performs post-navigation work;
- `onError` handles router-level failures.

Hook fragments are private to the initializer. Recovery for a stale lazy-loaded chunk should match only known chunk
load failures; unrelated router errors must remain visible instead of being converted into reloads.

### Fallbacks

Not-found, access-denied, generic-error, and maintenance screens are system navigation states, so they belong to the
router rather than a product domain. Include only the states the application uses and place the catch-all route last.

These conventions are based on the Dev Lab entries for
[router initialization](https://github.com/workaholic-max/dev-lab/tree/main/code/router-init),
[ordered guards](https://github.com/workaholic-max/dev-lab/tree/main/code/router-guards), and
[resolved route metadata](https://github.com/workaholic-max/dev-lab/tree/main/code/resolved-route-meta).

---

## Services

A service owns one runtime capability behind an explicit public API. It lives in the narrowest domain, feature, or
shared area that owns that capability.

Services requiring startup work expose `init()`. Initialization should be idempotent when repeated calls are possible,
and a service should fail clearly if a required initialization step was skipped. A service with no startup work can be
used directly even if it follows the `*.service.*` naming convention.

See [Adding a Service](docs/new-service.md) for placement, initialization, and testing guidance.

---

## Public Modules and Private Fragments

A complex module may split one coordinated whole into focused files under `fragments/`. Only the assembling entry point
imports those fragments; consumers use the public module.

```text
<module>/
├─ fragments/
│  ├─ first-part.*
│  └─ second-part.*
└─ index.*
```

Fragments use relative imports internally and are never imported through layer aliases. This is useful for ordered
startup steps, guard chains, router hooks, and compound components whose pieces are not meaningful independently. Two
trivial functions do not need a fragments directory.

The convention is based on
[Dev Lab fragments](https://github.com/workaholic-max/dev-lab/tree/main/code-style/fragments-convention).

---

## Imports, Aliases, and Boundaries

Dedicated aliases make layer crossings visible:

- `@router` and `@router/*`
- `@api` and `@api/*`
- `@domains/*`
- `@features/*`
- `@shared/*`

The root `@/` alias is reserved for source paths without a dedicated layer alias, such as the `app` import from the
entry point. It must not bypass a specific alias.

Keep runtime aliases aligned across Vite, TypeScript, and ESLint resolution. In this repository Vite and ESLint share
the JavaScript alias definition, while TypeScript mirrors it in `paths`. Adding or renaming an alias requires updating
every resolver before code begins using it.

Import rules:

- use aliases across layers and relative imports for nearby private files;
- import `app` only from the application entry point;
- never import domains from features;
- keep fragments private and relative;
- use a public entry point when consumers should not know a module's internals;
- include explicit extensions for local source and stylesheet imports;
- sort imports consistently and remove unused imports;
- reject unresolved imports, duplicate imports, and file-level cycles.

### ESLint as Architectural Enforcement

Linting enforces the mechanical portion of the model: dedicated aliases, the application boundary, the
feature-to-domain prohibition, fragment privacy, module entry points where declared, extensions, ordering, and cycle
detection. It also applies Vue and accessibility rules, with type-aware linting for TypeScript source files.

Vue Single-File Components receive Vue-appropriate linting and are type-checked by `vue-tsc`. Prettier compatibility
must be applied last so style rules do not conflict with formatting. Linting cannot decide whether a permitted
cross-domain dependency is good design; that remains a review decision.

---

## Build Configuration and Auto-Imports

Build and lint configuration is split into named fragments under `configuration/` so the root configuration files show
composition rather than implementation detail.

Vite composes the Vue plugin, aliases, test configuration, and any optional plugins. Optional plugins should remain in
their own configuration modules so they can be removed without rewriting the architecture.

Auto-imports are intentionally allowlisted. Reserve them for stable, frequently used framework primitives and generate
their TypeScript declarations into a checked or generated declarations folder. Project modules, business logic, and
less common framework APIs use explicit imports. A curated list keeps source readable and prevents a plugin from
silently turning broad libraries into globals.

TypeScript uses strict checking and bundler-compatible resolution. JavaScript may coexist during migration, but Vue and
TypeScript correctness is verified by `vue-tsc`; IDE inference alone is not the verification contract.

---

## Testing

Tests are colocated in a local `tests/` folder under the area they verify. They follow the same aliases and dependency
rules as production code, preserving ownership during refactors.

Natural units include stores, composables, business utilities, permission policies, guards, services, and reusable
components. Test public behavior rather than private fragments.

The top-level `tests/` folder contains global setup only: shared stubs, package configuration, matchers, or environment
polyfills. The test runner uses a browser-like environment for component behavior and reuses build aliases so test and
production resolution do not drift.

---

## Development and Delivery Safeguards

Repository safeguards provide feedback at different scopes:

1. editor formatting and lint integration gives immediate feedback;
2. the Husky-managed pre-commit hook formats and lints staged files, then runs a project type-check;
3. local verification runs formatting, linting, type-checking, tests, and a production build;
4. continuous integration repeats the repository-wide contract from a locked dependency graph.

The GitHub Actions workflow runs for pull requests and pushes to the main branch, uses read-only repository contents,
cancels superseded runs for the same ref, installs the pinned package-manager and Node versions, and installs from the
lockfile before verification. The production build includes type-checking, so CI cannot publish a bundle that failed
the declared type contract.

Pre-commit checks optimize developer feedback; they do not replace the full suite because staged-file checks cannot
cover unchanged dependencies, all tests, or production bundling.

See [Code Style and Verification](docs/code-style.md) for the command-level workflow.

---

## Code Organization Preferences

Preferences improve scanability without changing layer ownership.

Section comments are useful in a file with several real concerns—types, state, lifecycle, handlers, and implementation.
Short, single-purpose files should not receive artificial dividers.

```ts
// ───────────────────────────────────────────────────────
// State
// ───────────────────────────────────────────────────────
```

The convention comes from
[Dev Lab section comments](https://github.com/workaholic-max/dev-lab/tree/main/code-style/section-comments).

---

## Optional Facilities

Styling tokens, icon rendering, PWA support, fonts, favicons, social metadata, UI controls, directives, and individual
shared utilities can demonstrate good implementations without defining the layer model. Keep them in the layer that
owns them, document non-obvious behavior near the implementation, and remove them freely when a product does not need
them.

Repository-specific provenance and optional choices live under [`references/`](references/README.md). The architecture
and the portable guides under [`docs/`](docs/README.md) remain complete without that folder.
