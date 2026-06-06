# Architecture

A reference architecture for **Vue 3** applications — built with TypeScript, Vite, Pinia, and Vue Router — designed for
long-term maintainability, clear boundaries, predictable structure, and high codebase readability.

It scales from small to large projects and is meant as a blueprint to build on: the layered structure below defines
where code lives and how layers may depend on one another, with the core boundaries enforced by ESLint.

---

## [`app`/](https://github.com/workaholic-max/architecture/tree/main/src/app)

Responsible exclusively for application bootstrapping and startup.

- Expected to be imported once, and only
  from [main.ts](https://github.com/workaholic-max/architecture/blob/main/src/main.ts)
- **Never imported by any other layer** — it is the top of the dependency graph
- Allowed to import all other layers: `router` `api` `domains` `features` `shared` etc
- May contain local-only modules: `services` `utils` `enums` `composables` `components` etc

---

## [`app/`init/](https://github.com/workaholic-max/architecture/tree/main/src/app/init)

Responsible for executing all required initialization steps before the application is mounted.

- `router`
- `pinia`
- `packages`
- `services`
- etc

Services that need startup setup expose an `init()` method. The `services` step discovers every `*.service.ts` and runs
its `init()`, so adding a new service to startup just means following the naming convention — no central registration.

---

## [`domains`/](https://github.com/workaholic-max/architecture/tree/main/src/domains)

Encapsulates a specific responsibility and fully owns its internal implementation and business logic.

A domain represents an area of the product — a set of related pages and the logic behind them (`dashboard`,
`onboarding`, `settings`, `employees`, …) — not a backend-style data model. The name reflects a user-facing area rather
than an entity, so it is fine for a domain such as `settings` not to map to any single model.

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

## [`features`/](https://github.com/workaholic-max/architecture/tree/main/src/features)

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

## [`shared`/](https://github.com/workaholic-max/architecture/tree/main/src/shared)

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

## [`api`/](https://github.com/workaholic-max/architecture/tree/main/src/api)

Defines interaction with backend APIs and other external services.

- The entry point
  is [index.js](https://github.com/workaholic-max/architecture/blob/main/src/api/index.js), which
  aggregates and exports all available APIs
- APIs are grouped by resource and represent available operations
- Cross-cutting (non-domain) resources live in `resources/`; `domains` and `features` define their own `api.ts`, all
  surfaced through the same entry point
- An API resource may expose nested structures

---

## [`api/`client.ts](https://github.com/workaholic-max/architecture/blob/main/src/api/client.ts)

Responsible for configuring and executing requests to external services, providing a single, consistent entry point for
API communication.

---

## [`router/`fallback/](https://github.com/workaholic-max/architecture/tree/main/src/router/fallback)

Responsible for routing in system-level cases.

- not found page
- access denied page
- error page
- maintenance page
- etc

---

## [`router/`guards/](https://github.com/workaholic-max/architecture/tree/main/src/router/guards)

Responsible for controlling navigation flow.

The entry point
is [index.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/guards/index.ts),
which provides a function for running route guards in a defined order. The order of guards is significant and directly
affects how navigation decisions are resolved.

Guards are checked one by one to determine how navigation proceeds:

- `null` — no decision is made and evaluation continues with the next guard
- `true` — navigation is allowed and further guard evaluation stops
- `object` — navigation is redirected and further guard evaluation stops

---

## [`router/`init.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/init.ts)

Responsible for initializing the application router.

Provides a function responsible for preparing and configuring the `router`, including applying required setup
such as guards and other routing concerns.

---

## [`router/`routes.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/routes.ts)

Responsible for composing the application routing.

Aggregates and combines route definitions exposed by `domains` and `fallback` routing into a single structure that
represents all available application routes.

---

## Possible Improvements

- Type-aware ESLint rules
- Unit tests
- PWA

---

## Implementation Notes

This section highlights practical implementation choices, patterns, and conventions used across the project that are not
strictly defined by the architectural structure. It provides additional context around how certain concerns are handled
in practice, capturing decisions and approaches that help keep the codebase consistent, predictable, and easier to
reason about as it grows.

---

### Fonts

Fonts are placed in [public/](https://github.com/workaholic-max/architecture/tree/main/public) and
preloaded
in [index.html](https://github.com/workaholic-max/architecture/blob/main/index.html) to prevent FOUT (
Flash of Unstyled
Text) during application startup.

Preloading fonts ensures they are available before initial render, improving visual stability and perceived performance,
especially on slower connections.

---

### Section Comments

It's recommended to use reusable section comment blocks to visually separate related blocks of logic. This improves
readability, helps structure complex code, and makes responsibilities clearer.

For setup instructions and IDE
configuration: [docs/section-comments.md](https://github.com/workaholic-max/architecture/blob/main/docs/section-comments.md)

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
in [router/init.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/init.ts) catches chunk load
failures and reloads the page, recovering from transient network issues without leaving the user in a broken state.

All `node_modules` are consolidated into a single `vendor` chunk via `manualChunks`
in [vite.config.ts](https://github.com/workaholic-max/architecture/blob/main/vite.config.ts), keeping it independently
cached from application code.

---

### [vite.config.ts](https://github.com/workaholic-max/architecture/blob/main/vite.config.ts)

The configuration is intentionally minimal and primarily focused on declaring module resolution aliases that reflect the
architectural structure of the project.

Additional aliases are provided for shared styling resources (such as variables, mixins, and functions) to enforce a
centralized and predictable styling structure.

---

### [configuration/vite/plugins/auto-import.js](https://github.com/workaholic-max/architecture/blob/main/configuration/vite/plugins/auto-import.js)

A curated set of frequently used Vue and Vue Router APIs is auto-imported via unplugin-auto-import, so they are
available without an explicit import statement:

- `vue` — `ref`, `reactive`, `computed`, `watch`, `nextTick`, `useTemplateRef`, and the lifecycle hooks
- `vue-router` — `useRouter`, `useRoute`

The list is an intentional allowlist; anything outside it is imported normally. Type declarations are generated into
[dts/auto-imports.d.ts](https://github.com/workaholic-max/architecture/blob/main/dts/auto-imports.d.ts), keeping
TypeScript and the editor aware of the injected globals.

---

### [eslint.config.js](https://github.com/workaholic-max/architecture/blob/main/eslint.config.js)

This configuration helps maintain a clean codebase, prevents architectural violations, and ensures that project
structure and conventions are applied consistently.

- Explicit file extensions are required for JavaScript, TypeScript, Vue, and SCSS imports to keep dependencies clear
- Imports are sorted into a consistent order, grouped by layer and module type
- Layer-specific aliases (`@router`, `@api`, `@domains`, `@features`, `@shared`) are enforced, while root-level `@/`
  imports into these layers are intentionally forbidden.
- Imports from `app` are forbidden outside the application entry point
- `features` are forbidden from importing `domains`
- Local-only `fragments` cannot be imported through absolute aliases
- File-level circular dependencies are forbidden
- Vue template accessibility (labels, keyboard interaction, valid ARIA) is linted via `eslint-plugin-vuejs-accessibility`

Aliases are preferred for cross-folder dependencies. Relative imports remain appropriate for nearby implementation
details and are not required for every internal module.

---

### [.github/workflows/ci.yml](https://github.com/workaholic-max/architecture/blob/main/.github/workflows/ci.yml)

Continuous integration runs on every push to `main` and on every pull request via GitHub Actions.

It installs dependencies from the lockfile and runs three required checks:

- `format:check` — Prettier
- `lint:check` — ESLint (architecture boundaries + code quality)
- `build` — type-checks with `vue-tsc`, then builds for production

Husky runs formatting, linting, and type-checking locally on commit (staged files) for fast feedback; CI re-runs them
across the whole project, adds the production build, and is the authoritative gate that cannot be bypassed.

---

### [api/](https://github.com/workaholic-max/architecture/tree/main/src/api)

Serves as the single reference for all available interactions with backend and external services, keeping their naming
and usage consistent and predictable.

---

### [api/client.ts](https://github.com/workaholic-max/architecture/blob/main/src/api/client.ts)

The API client supports abortable requests.

Request cancellation is handled
via [shared/composables/useAbortableRequest.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/composables/useAbortableRequest.ts)
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

The API client can be further extended with better response interceptors:

- redirect to error page on server errors
- redirect to authentication flow when the user is not authorized
- redirect to maintenance page when the backend is unavailable

---

### [assets/styles/abstracts/variables/](https://github.com/workaholic-max/architecture/tree/main/src/assets/styles/abstracts/variables)

Variables are grouped by concern (spacing, colors, breakpoints, etc.) and exposed through a single entry point using
Sass `@forward`. Each group is prefixed at the entry level (e.g. `@forward './spacing.scss' as space-*`) to keep usage
explicit and prevent naming collisions. Inside individual variable files, names are intentionally kept simple and
unprefixed (e.g. `base`, `md`, `lg`). Context is provided by that prefix rather than repeating prefixes within each
file, improving readability and maintainability.

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

### [assets/styles/abstracts/functions/\_index.scss](https://github.com/workaholic-max/architecture/blob/main/src/assets/styles/abstracts/functions/_index.scss)

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

### [assets/styles/abstracts/mixins/\_index.scss](https://github.com/workaholic-max/architecture/blob/main/src/assets/styles/abstracts/mixins/_index.scss)

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

### [router/composables/useResolvedRoutes.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/composables/useResolvedRoutes.ts)

This composable centralizes access to `router.resolve()` results and avoids repeated resolution of the same route.
Resolved values are cached by route name and reused across the application to ensure consistent access to route metadata
and generated URLs.

It exposes focused helpers for retrieving commonly needed information, such as:

- resolved route metadata (e.g. title, permissions)
- resolved route hrefs for navigation (e.g. window.location.href = ...)

---

### [shared/composables/useEntitySearch.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/composables/useEntitySearch.ts)

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

### [shared/directives/click-outside.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/directives/click-outside.ts)

In this project, directives are not globally registered. They must be explicitly imported and used only where needed.
This keeps usage transparent and prevents hidden dependencies across the application.

To keep directives predictable and reusable, they must follow a consistent export pattern. Each directive is exported as
a named constant, using the `v` prefix followed by a PascalCase name. The export name directly defines how the directive
is used in templates, automatically mapping to kebab-case.

- Example: exported `vClickOutside`, usage `v-click-outside`
- Naming must be predictable and kebab-case compatible
- Directives may expose additional configuration (e.g. enums)

---

### [shared/icons/](https://github.com/workaholic-max/architecture/tree/main/src/shared/icons)

This module provides a centralized icon rendering system based on CSS `mask-image` and `background-image`, designed to
reduce DOM and rendering overhead caused by large amounts of inline SVG components in repeated lists and dynamic UI
sections.

Icons are rendered through a single base component `Icon.vue` using CSS-driven image masking rather than inline SVG
nodes. This keeps the DOM lightweight while still supporting runtime color customization, contextual size overrides, and
multicolor icon rendering.

All icon names, rendering modes, and directional logic are defined in a typed
registry ([registry.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/icons/registry.ts)) and
documented in detail in [docs/icons.md](https://github.com/workaholic-max/architecture/blob/main/docs/icons.md)

---

### [shared/components/modal/](https://github.com/workaholic-max/architecture/tree/main/src/shared/components/modal)

This implementation is what this project calls a `construction`

Exposes a single public entry
point [index.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/components/modal/index.js)
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

### [shared/components/ConfirmationModal.vue](https://github.com/workaholic-max/architecture/blob/main/src/shared/components/ConfirmationModal.vue)

Instead of rendering multiple confirmation modals or controlling them via props, this component exposes an `open` method
and is intended to be instantiated **once per view** and reused for multiple confirmation scenarios (delete, edit,
etc.).

```
// ───────────────────────────────────────────────────────
// Confirmation modal
// ───────────────────────────────────────────────────────

const confirmationModalRef = ref(null);

const openEmployeeEditModal = (employee) => {
    confirmationModalRef.value.open({
        title: "Edit Employee?",
        message: 'will be unavailable to others during editing.',
        entityName: employee.name,
        submitBtnText: 'edit',
        action: () => EmployeesApi.draft.create(employee.id),
        onSuccess: (data) => {
            ...

            confirmationModalRef.value.close(true);
        },
    });
};

const openEmployeeDeleteModal = (employee) => {
    confirmationModalRef.value.open({
        title: "Delete Employee?",
        message: "will be permanently deleted.",
        entityName: employee.name,
        submitBtnText: 'delete',
        action: () => EmployeesApi.delete(employee.id),
        onSuccess: (data) => {
            ...

            confirmationModalRef.value.close(true);
        },
    });
};

<ConfirmationModal ref="confirmationModalRef" />
```

---

### [shared/configs/limits.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/configs/limits.ts)

Centralized business limits for the application.

This configuration defines global constraints such as text length boundaries, numeric ranges, and entity-level limits.
These values represent business rules, not implementation details, and are expected to change as product requirements
evolve. It serves as a single source of truth for constraints that define what the system allows.

---

### [shared/controls/body-scroll.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/controls/body-scroll.js)

Controls document body scroll locking in a predictable and safe way.

This `control` is responsible for enabling and disabling body scrolling when required, for example when modals,
overlays, or other blocking UI elements are displayed.

This logic is implemented as a `control` rather than a service because it:

- manages a small, isolated piece of UI state
- exposes explicit imperative actions `lock`, `unlock`
- has no lifecycle, side effects, or dependencies beyond the document itself

Its responsibility is strictly limited to coordinating scroll state, not managing application data or behavior.

---

### [shared/controls/interaction.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/controls/interaction.js)

Controls user interaction with the document in a predictable and temporary way.

This `control` is responsible for disabling all user interactions, for example when overlays, modals, or transitional UI
states are active and accidental interaction must be prevented.

Interaction locking is expected to be short-lived and intentional. It is designed to protect user experience during
critical UI moments.

Typical use cases include:

- preventing interaction with the rest of the page while an overlay is active
- avoiding accidental clicks during modal opening

---

### [shared/layouts/BaseLayout.vue](https://github.com/workaholic-max/architecture/blob/main/src/shared/layouts/BaseLayout.vue)

This layout demonstrates how routing metadata is used as the single source of truth for page-level information such as
titles.

Navigation is rendered from a simple configuration containing only route names. All additional information (such as
titles or permissions) is resolved dynamically
via [router/composables/useResolvedRoutes.ts](https://github.com/workaholic-max/architecture/blob/main/src/router/composables/useResolvedRoutes.ts),
avoiding redundant configuration and keeping navigation logic centralized and predictable.

---

### [shared/services/device.service.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/services/device.service.ts)

This service is responsible for determining and exposing information about the current device environment.

At the moment, this includes resolving the active device type. The service must be explicitly initialized before being
used.

Initialization prepares required media queries and listeners and is expected to be executed during application startup
as part of the app initialization flow.

---

### [shared/services/local-storage.service.ts](https://github.com/workaholic-max/architecture/blob/main/src/shared/services/local-storage.service.ts)

This service centralizes access to `localStorage` to ensure safe, predictable behavior and avoid scattering direct
storage usage across the application.

Stored values are automatically namespaced using a predefined prefix, preventing key collisions with other applications
or environments and keeping stored data clearly identifiable.

Also handles common edge cases, such as invalid JSON data or unavailable storage capacity.
