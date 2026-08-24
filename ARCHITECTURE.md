# Architecture Guide

This document defines the project structure, layer ownership, dependency rules, and implementation conventions for the
application. Build product features inside these boundaries unless an architectural change is explicitly requested.

The structure scales from small to large projects and is meant as a blueprint to build on: the layered sections below
define where code lives and how layers may depend on one another, with key import boundaries supported by ESLint.

This guide documents the repository's concrete reference implementation. Choices such as SCSS and Progressive Web App
support show how real application concerns fit within the structure; they can be adapted or replaced without changing
the layer ownership and dependency rules that define the architecture.

---

## [`app`/](src/app)

Responsible exclusively for application bootstrapping and startup.

- Expected to be imported once, and only
  from [main.ts](src/main.ts)
- **Never imported by any other layer** — it is the top of the dependency graph
- Allowed to import all other layers: `router` `api` `domains` `features` `shared` etc
- May contain local-only modules: `services` `utils` `enums` `composables` `components` etc

---

## [`app/`init/](src/app/init)

Responsible for executing all required initialization steps before the application is mounted.

- `router`
- `pinia`
- `packages`
- `services`
- etc

Services that need startup setup expose an `init()` method. The `services` step discovers every `*.service.ts` and
`*.service.js` file and runs its `init()`, so adding a new service to startup just means following the naming convention
— no central registration.

Documented in full, including why the call order matters, in [docs/application-init.md](docs/application-init.md).

---

## [`domains`/](src/domains)

Encapsulates a specific responsibility and fully owns its internal implementation and business logic.

A domain represents an area of the product — a set of related pages and the logic behind them (`dashboard`,
`onboarding`, `settings`, `employees`, ...) — not a backend-style data model. The name reflects a user-facing area
rather than an entity, so it is fine for a domain such as `settings` not to map to any single model.

- `api`
- `types`
- `mocks`
- `routes`
- `stores`
- `services`
- `utils`
- `configs`
- `enums`
- `composables`
- `views`
- `layouts`
- `components`
- etc

Domains may depend on other `domains/` when the dependency represents a real relationship between business areas.
Cross-domain dependencies must remain one-directional and file-level circular dependencies are forbidden.

---

## [`features`/](src/features)

Encapsulates a specific reusable concern and owns its internal implementation.

- `api`
- `types`
- `mocks`
- `stores`
- `services`
- `utils`
- `configs`
- `enums`
- `composables`
- `layouts`
- `components`
- etc

Features are consumed by `domains` and higher-level layers; they must never depend on `domains`.

---

## [`shared`/](src/shared)

Contains reusable and cross-cutting modules shared across the application — from generic utilities and components to
application-wide aggregations that require knowledge of other areas.

- `controls`
- `icons`
- `types`
- `stores`
- `services`
- `utils`
- `configs`
- `enums`
- `composables`
- `directives`
- `layouts`
- `components`
- etc

`shared` is intentionally not treated as a strict foundational layer. It may consume modules from other application
areas and expose reusable modules back to them when needed for cross-cutting concerns such as aggregated types,
application-wide configurations, layouts, and reusable behavior.

This flexibility must remain intentional. A module belongs in `shared` when it is meaningfully reused or centralizes an
application-wide concern, not only because its final owner is unclear. File-level circular dependencies remain
forbidden.

---

## [`api`/](src/api)

Defines interaction with backend APIs and other external services.

- The entry point
  is [index.js](src/api/index.js), which
  aggregates and exports all available APIs
- APIs are grouped by resource and represent available operations
- Cross-cutting (non-domain) resources live in `resources/`; `domains` and `features` define their own `api.ts`, all
  surfaced through the same entry point
- An API resource may expose nested structures

---

## [`api/`client.ts](src/api/client.ts)

Responsible for configuring and executing requests to external services, providing a single, consistent entry point for
API communication.

---

## [`router/`fallback/](src/router/fallback)

Responsible for routing in system-level cases.

- not found page
- access denied page
- error page
- maintenance page
- etc

---

## [`router/`guards/](src/router/guards)

Responsible for controlling navigation flow.

The entry point
is [index.ts](src/router/guards/index.ts),
which provides a function for running route guards in a defined order. The order of guards is significant and directly
affects how navigation decisions are resolved.

Guards are checked one by one to determine how navigation proceeds:

- `null` — no decision is made and evaluation continues with the next guard
- `true` — navigation is allowed and further guard evaluation stops
- `object` — navigation is redirected and further guard evaluation stops

---

## [`router/init/`](src/router/init)

Responsible for initializing the application router.

A folder of fragments, one per Vue Router hook it wires up: `before-each.ts` runs the guard chain (and restores the
last-visited route on first load, if it's still reachable), `after-each.ts` records the current route as
last-visited, `on-error.ts` recovers from stale-chunk errors after a deploy. `index.ts` is the only file that
imports any of them and wires all three plus `app.use(router)`.

---

## [`router/`routes.ts](src/router/routes.ts)

Responsible for composing the application routing.

Aggregates and combines route definitions exposed by `domains` and `fallback` routing into a single structure that
represents all available application routes.

---

## Implementation Notes

This section highlights practical implementation choices, patterns, and conventions used across the project that are not
strictly defined by the architectural structure. It provides additional context around how certain concerns are handled
in practice, capturing decisions and approaches that help keep the codebase consistent, predictable, and easier to
reason about as it grows.

---

### Fonts

Fonts are placed in [public/](public) and preloaded in
[index.html](index.html) to reduce the chance of FOUT (Flash of
Unstyled Text) during application startup.

Preloading fonts tells the browser to request them early, improving visual stability and perceived performance,
especially on slower connections.

---

### Section Comments

It's recommended to use reusable section comment blocks to visually separate related blocks of logic. This improves
readability, helps structure complex code, and makes responsibilities clearer.

For setup instructions and IDE
configuration: [docs/section-comments.md](docs/section-comments.md)

```
// ───────────────────────────────────────────────────────
// Employees state
// ───────────────────────────────────────────────────────
```

---

### Lazy Loading

All domain views are lazy-loaded at the route level using dynamic imports. Fallback views `NotFoundView` &
`AccessDeniedView` stay eager — they must always be available regardless of network conditions.

```ts
component: () => import('@domains/dashboard/views/DashboardView.vue');
```

`router.onError()` handler
in [router/init/fragments/on-error.ts](src/router/init/fragments/on-error.ts) catches chunk load
failures and reloads the page, recovering from transient network issues without leaving the user in a broken state.

All `node_modules` are consolidated into a single `vendor` chunk via `manualChunks`
in [vite.config.ts](vite.config.ts), keeping it independently
cached from application code.

---

### Testing

Unit and component testing is configured with [Vitest](https://vitest.dev/),
[@vue/test-utils](https://test-utils.vuejs.org/) (jsdom environment), and
[@pinia/testing](https://pinia.vuejs.org/cookbook/testing.html) for stubbing stores when testing components — reusing
the Vite config so path aliases resolve in tests.

Tests are co-located with the code they verify. When a layer needs tests, it keeps them in a local `tests/` folder
(`domains/<domain>/tests/`, `features/<feature>/tests/`, `shared/tests/`, `router/tests/`, ...), next to the module
under test. This mirrors how the architecture is organized — by area, not by technical type — so a domain or feature
can stay self-contained: its tests live with it, move with it, and are deleted with it. The natural units to cover are
stores, composables, and components.

Because tests live inside the layer they belong to, they are ordinary source files: they obey the same ESLint rules,
import boundaries, and type-checking as everything else — nothing is excluded. A unit test imports its module exactly
as production code would, so it never needs to cross a boundary in the first place.

Global, cross-cutting test configuration lives in
[tests/setup.ts](tests/setup.ts), wired through Vitest's
`setupFiles` in [vite.config.ts](vite.config.ts); it runs once
before the suite and is the place for global stubs, plugins, mocks, or custom matchers. The top-level `tests/` folder
holds only this configuration — never test files. `passWithNoTests` keeps the test step green when none exist, so the
project never forces you to have any.

---

### Progressive Web App

The application is installable and works offline via [vite-plugin-pwa](https://vite-pwa-org.netlify.app/), configured
in [configuration/vite/plugins/pwa.js](configuration/vite/plugins/pwa.js) and wired into
[vite.config.ts](vite.config.ts), plus a set of hand-authored `<head>` tags in [index.html](index.html) covering
install presentation and social-link previews that the generated manifest can't reach on its own.

Startup is gated on the service worker via
[shared/services/service-worker.service.ts](src/shared/services/service-worker.service.ts), called from
[app/App.vue](src/app/App.vue); an iOS-standalone pull-to-refresh replacement lives in
[shared/services/pull-to-refresh.service.ts](src/shared/services/pull-to-refresh.service.ts); and
[app/components/OccurredErrorModal.vue](src/app/components/OccurredErrorModal.vue) accounts for the offline case.

Documented in full, with the reasoning behind each piece and the dev-lab entries it's drawn from, in
[docs/progressive-web-app.md](docs/progressive-web-app.md).

---

### [vite.config.ts](vite.config.ts)

The configuration composes the Vue, auto-import, and PWA plugins; applies the module aliases that reflect the
architectural layers and shared SCSS resources; keeps third-party dependencies in a separate `vendor` chunk; and shares
the same aliases and jsdom setup with Vitest.

---

### [configuration/vite/plugins/auto-import.js](configuration/vite/plugins/auto-import.js)

A curated set of frequently used Vue and Vue Router APIs is auto-imported via unplugin-auto-import, so they are
available without an explicit import statement:

- `vue` — `ref`, `reactive`, `computed`, `watch`, `nextTick`, `useTemplateRef`, and the lifecycle hooks
- `vue-router` — `useRouter`, `useRoute`

The list is an intentional allowlist; anything outside it is imported normally. Type declarations are generated into
[dts/auto-imports.d.ts](dts/auto-imports.d.ts), keeping
TypeScript and the editor aware of the injected globals.

---

### [eslint.config.js](eslint.config.js)

This configuration helps maintain a clean codebase, helps prevent architectural violations, and ensures that project
structure and conventions are applied consistently.

- Explicit file extensions are required for JavaScript, TypeScript, Vue, and SCSS imports to keep dependencies clear
- Imports are sorted into a consistent order, grouped by layer and module type
- Layer-specific aliases (`@router`, `@api`, `@domains`, `@features`, `@shared`) are enforced, while root-level `@/`
  imports into these layers are intentionally forbidden.
- Imports from `app` are forbidden outside the application entry point
- Feature-to-domain alias imports are forbidden
- Local-only `fragments` cannot be imported through absolute aliases
- File-level circular dependencies are forbidden
- Vue template accessibility (labels, keyboard interaction, valid ARIA) is linted via
  `eslint-plugin-vuejs-accessibility`
- Type-aware rules run on TypeScript files via `recommendedTypeChecked`

Aliases are preferred for cross-folder dependencies. Relative imports remain appropriate for nearby implementation
details and are not required for every internal module.

---

### [.github/workflows/ci.yml](.github/workflows/ci.yml)

Continuous integration runs on every push to `main` and on every pull request via GitHub Actions.

It installs dependencies from the lockfile and runs four required checks:

- `format:check` — Prettier
- `lint:check` — ESLint (architecture boundaries + code quality)
- `test` — the Vitest suite (passes when there are no test files)
- `build` — type-checks with `vue-tsc`, then builds for production

Husky runs formatting and linting through `lint-staged`, then runs a full type-check locally on commit for fast
feedback. CI re-runs the required checks across the whole project, adds the production build, and provides the
repository-wide verification result.

---

### [api/](src/api)

Serves as the single reference for all available interactions with backend and external services, keeping their naming
and usage consistent and predictable.

---

### [api/client.ts](src/api/client.ts)

The API client supports abortable requests.

Request cancellation is handled
via [shared/composables/useAbortableRequest.ts](src/shared/composables/useAbortableRequest.ts)
allowing requests to be automatically aborted when the user leaves a page or manually cancelled using `abortRequests`,
for example when a newer request replaces a previous one.

```
const { sendAbortableRequest } = useAbortableRequest();

onBeforeMount(() => {
    sendAbortableRequest(EmployeesApi.getAll())
        .then(() => {})
        .catch(() => {});
});
```

Documented in full — the shared instance, cancellation, 401-triggered reload flow, and the auth header that is not wired
in yet — in [docs/api-client.md](docs/api-client.md).

---

### [assets/styles/abstracts/variables/](src/assets/styles/abstracts/variables)

Variables are grouped by concern (spacing, colors, breakpoints, etc.) and exposed through a single entry point using
Sass `@forward`. Each group is prefixed at the entry level (e.g. `@forward './spacing.scss' as space-*`) to keep usage
explicit and prevent naming collisions. Inside individual variable files, names are intentionally kept simple and
unprefixed (e.g. `base`, `md`, `lg`). Context is provided by that prefix rather than repeating prefixes within each
file, improving readability and maintainability.

For why this is split into per-category partials behind a prefixed barrel, and why the build-tool alias resolves to a
Sass module path rather than just the equivalent JS one, see [docs/scss-tokens.md](docs/scss-tokens.md).

Usage example:

```
<style lang="scss">
@use '@scss-vars' as vars;

h2 {
  margin-bottom: vars.$space-base;
  font-size: vars.$font-size-md;
  color: vars.$color-primary;
}
</style>
```

---

### [assets/styles/abstracts/functions/\_index.scss](src/assets/styles/abstracts/functions/_index.scss)

Usage example:

```
<style lang="scss">
@use '@scss-vars' as vars;
@use '@scss-functions' as functions;

ul {
  flex-basis: functions.flex-basis(4, vars.$space-sm);
}
</style>
```

---

### [assets/styles/abstracts/mixins/\_index.scss](src/assets/styles/abstracts/mixins/_index.scss)

Usage example:

```
<style lang="scss">
@use '@scss-vars' as vars;
@use '@scss-mixins' as mixins;

button {
  border: 1px solid transparent;

  @include mixins.transition(border-color, color);

  @include mixins.hover {
    border-color: vars.$color-primary;
    color: vars.$color-primary;
  }
}
</style>
```

---

### [router/composables/useResolvedRoutes.ts](src/router/composables/useResolvedRoutes.ts)

This composable centralizes access to `router.resolve()` results and avoids repeated resolution of the same route.
Resolved values are cached by route name and reused across the application to ensure consistent access to route metadata
and generated URLs.

It exposes focused helpers for retrieving commonly needed information, such as:

- resolved route metadata (e.g. title, permissions)
- resolved route hrefs for navigation (e.g. window.location.href = ...)

---

### [shared/composables/useEntitySearch.ts](src/shared/composables/useEntitySearch.ts)

Provides a minimal reusable search composable for filtering flat entity collections by one or multiple string fields.

The composable is intentionally designed for simple entity filtering scenarios where entities consist of flat searchable
properties such as `name`, `email`, `code`, etc.

Search keys are fully type-safe and restricted to string-based entity fields.

Usage example:

```ts
const { searchModel, getFilteredEntities } = useEntitySearch<Department>({
    searchKeys: ['name'],
});

const filteredDepartments = computed(() => getFilteredEntities(departments.value));
```

This composable is intentionally limited to flat collections and simple string matching to keep behavior predictable and
implementation lightweight.

---

### [shared/directives/click-outside.ts](src/shared/directives/click-outside.ts)

In this project, directives are not globally registered. They must be explicitly imported and used only where needed.
This keeps usage transparent and prevents hidden dependencies across the application.

To keep directives predictable and reusable, they must follow a consistent export pattern. Each directive is exported as
a named constant, using the `v` prefix followed by a PascalCase name. The export name directly defines how the directive
is used in templates, automatically mapping to kebab-case.

- Example: exported `vClickOutside`, usage `v-click-outside`
- Naming must be predictable and kebab-case compatible
- Directives may expose additional configuration (e.g. enums)

---

### [shared/icons/](src/shared/icons)

This module provides a centralized icon rendering system based on CSS `mask-image` and `background-image`, designed to
reduce DOM and rendering overhead caused by large amounts of inline SVG components in repeated lists and dynamic UI
sections.

Icons are rendered through a single base component `Icon.vue` using CSS-driven image masking rather than inline SVG
nodes. This keeps the DOM lightweight while still supporting runtime color customization, contextual size overrides, and
multicolor icon rendering.

All icon names, rendering modes, and directional logic are defined in a typed
registry ([registry.ts](src/shared/icons/registry.ts)) and
documented in detail in [docs/icons.md](docs/icons.md)

---

### [shared/components/modal/](src/shared/components/modal)

This implementation is what this project calls a `construction`

Exposes a single public entry
point [index.js](src/shared/components/modal/index.js)
that
exports an object containing all fragments.

- Fragments are not intended to be imported directly
- Fragments have a defined role and composition order

In this case, the modal is composed of an overlay and a dialog. These parts are designed to work together and are
meaningful only as a whole. Separating them into fragments allows responsibilities to be clearly divided while keeping
their composition controlled and predictable.

```
import Modal from '@shared/components/modal/index.js';

<Modal.Overlay>
  <Modal.Dialog>
    ...
  </Modal.Dialog>
</Modal.Overlay>
```

A similar approach can be applied to other complex UI elements, such as form fields. For example, a form field may be
composed of a label, input control, validation message, icons, hints, or overlays. While these parts can vary in
placement and configuration, they are most meaningful when used together as a single constructed unit. Implementing them
as a construction allows each fragment to focus on its own responsibility while keeping the overall composition
flexible, consistent, and easy to reason about.

---

### [shared/configs/limits.ts](src/shared/configs/limits.ts)

Centralized business limits for the application.

This configuration defines global constraints such as text length boundaries, numeric ranges, and entity-level limits.
These values represent business rules, not implementation details, and are expected to change as product requirements
evolve. It serves as a single source of truth for constraints that define what the system allows.

---

### [shared/controls/body-scroll.js](src/shared/controls/body-scroll.js)

Controls document body scroll locking in a predictable and safe way.

This `control` is responsible for enabling and disabling body scrolling when required, for example when modals,
overlays, or other blocking UI elements are displayed.

This logic is implemented as a `control` rather than a service because it:

- manages a small, isolated piece of UI state
- exposes explicit imperative actions `lock`, `unlock`
- has no startup lifecycle or dependencies beyond the document itself

Its responsibility is strictly limited to coordinating scroll state, not managing application data or behavior.

---

### [shared/controls/interaction.js](src/shared/controls/interaction.js)

Controls user interaction with the document in a predictable and temporary way.

This `control` is responsible for disabling all user interactions, for example when overlays, modals, or transitional UI
states are active and accidental interaction must be prevented.

Interaction locking is expected to be short-lived and intentional. It is designed to protect user experience during
critical UI moments.

Typical use cases include:

- preventing interaction with the rest of the page while an overlay is active
- avoiding accidental clicks during modal opening

---

### [shared/layouts/BaseLayout.vue](src/shared/layouts/BaseLayout.vue)

This layout demonstrates how routing metadata is used as the single source of truth for page-level information such as
titles.

Navigation is rendered from a simple configuration containing only route names. Titles are resolved dynamically through
[router/composables/useResolvedRoutes.ts](src/router/composables/useResolvedRoutes.ts), while the router guard chain
enforces permissions from the same route metadata when navigation occurs. This avoids duplicating either value in the
navigation configuration.

---

### [shared/services/device.service.ts](src/shared/services/device.service.ts)

This service is responsible for determining and exposing information about the current device environment.

At the moment, this includes resolving the active device type. The service must be initialized before it is used.

Initialization prepares required media queries and listeners and is expected to be executed during application startup
as part of the app initialization flow.

---

### [shared/services/local-storage.service.ts](src/shared/services/local-storage.service.ts)

This service centralizes access to `localStorage` to ensure safe, predictable behavior and avoid scattering direct
storage usage across the application.

Stored values are automatically namespaced using a predefined prefix, preventing key collisions with other applications
or environments and keeping stored data clearly identifiable.

Also handles common edge cases, such as invalid JSON data or unavailable storage capacity.
