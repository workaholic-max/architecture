# Architecture

A scalable solution for **Vue** applications, designed for long-term maintainability, clear boundaries, predictable
structure, and high codebase readability.

---

## [`app`/](https://github.com/workaholic-max/architecture/tree/main/src/app)

Defines how the application starts.

- Expected to be imported once, and only
  from [main.js](https://github.com/workaholic-max/architecture/blob/main/src/main.js)
- Allowed to import all other layers: `router` `api` `domains` `features` `shared` etc
- May contain local-only modules: `services` `utils` `constants` `composables` `components` etc

---

## [`app/`init/](https://github.com/workaholic-max/architecture/tree/main/src/app/init)

Responsible for executing all required initialization steps before the application is mounted.

- `router`
- `packages`
- `services`
- etc

---

## [`domains`/](https://github.com/workaholic-max/architecture/tree/main/src/domains)

Encapsulates a specific responsibility and fully owns its internal implementation and business logic.

- `routes`
- `services`
- `utils`
- `configs`
- `constants`
- `composables`
- `views`
- `layouts`
- `components`
- etc

Domains may depend on other `domains/` and such dependencies must remain strictly one-directional to avoid coupling and
cyclic dependencies between business areas

---

## [`features`/](https://github.com/workaholic-max/architecture/tree/main/src/featurues)

Encapsulates a specific reusable concern and owns its internal implementation.

- `services`
- `utils`
- `configs`
- `constants`
- `composables`
- `layouts`
- `components`
- etc

Features are intended to be consumed by `domains` and higher-level application layers.

---

## [`shared`/](https://github.com/workaholic-max/architecture/tree/main/src/shared)

Encapsulates generic, independent, reusable functionality and owns its internal implementation.

- `services`
- `utils`
- `configs`
- `constants`
- `composables`
- `layouts`
- `components`
- etc

Shared represents the lowest-level layer and may be freely consumed by higher-level application layers.

- `shared` must not import `domains`
- Modules within `shared` may depend on other `shared` modules as needed

---

## [`api`/](https://github.com/workaholic-max/architecture/tree/main/src/api)

Defines interaction with backend APIs and other external services.

- The entry point is [index.js](https://github.com/workaholic-max/architecture/blob/main/src/api/index.js), which
  aggregates and exports all available APIs
- APIs are grouped by resource and represent available operations
- API resource may expose nested structures

---

## [`api/`client.js](https://github.com/workaholic-max/architecture/blob/main/src/api/client.js)

Responsible for configuring and executing requests to external services, providing a single, consistent entry point for
API communication.

---

## [`router/`fallback/](https://github.com/workaholic-max/architecture/tree/main/src/router/fallback)

Responsible for routing in system-level cases.

- not found page
- error page
- maintenance page
- etc

---

## [`router/`guards/](https://github.com/workaholic-max/architecture/tree/main/src/router/guards)

Responsible for controlling navigation flow.

The entry point is [index.js](https://github.com/workaholic-max/architecture/blob/main/src/router/guards/index.js),
which provides a function for running route guards in a defined order. The order of guards is significant and directly
affects how navigation decisions are resolved.

Guards are checked one by one to determine how navigation proceeds:

- `null` — no decision is made and evaluation continues with the next guard
- `true` — navigation is allowed and further guard evaluation stops
- `object` — navigation is redirected and further guard evaluation stops

---

## [`router/`init.js](https://github.com/workaholic-max/architecture/blob/main/src/router/init.js)

Responsible for initializing the application router.

Provides a function responsible for preparing and configuring the `router`, including applying required setup
such as guards and other routing concerns.

---

## [`router/`routes.js](https://github.com/workaholic-max/architecture/blob/main/src/router/routes.js)

Responsible for composing the application routing.

Aggregates and combines route definitions exposed by `domains` and `fallback` routing into a single structure that
represents all available application routes.

---

## Possible Improvements

- TypeScript
- Pinia
- Lazy Loading
- PWA
- Unit tests
- Extend ESLint rules to enforce architectural boundaries more strictly if the codebase grows

---

## Implementation Notes

This section highlights practical implementation choices, patterns, and conventions used across the project that are not
strictly defined by the architectural structure. It provides additional context around how certain concerns are handled
in practice, capturing decisions and approaches that help keep the codebase consistent, predictable, and easier to
reason about as it grows.

---

### Fonts

Fonts are placed in [public/](https://github.com/workaholic-max/architecture/tree/main/public) and preloaded
in [index.html](https://github.com/workaholic-max/architecture/blob/main/index.html) to prevent FOUT (Flash of Unstyled
Text) during application startup.

Preloading fonts ensures they are available before initial render, improving visual stability and perceived performance,
especially on slower connections.

---

### Section Comments

It's recommended to use reusable section comment blocks to visually separate group-related logic. This improves
readability, helps structure complex code, and makes responsibilities clearer.

For setup instructions and IDE
configuration: [docs/section-comments.md](https://github.com/workaholic-max/architecture/blob/main/docs/section-comments.md)

```
// ───────────────────────────────────────────────────────
// Employees state
// ───────────────────────────────────────────────────────
```

---

### [vite.config.js](https://github.com/workaholic-max/architecture/blob/main/vite.config.js)

The configuration is intentionally minimal and primarily focused on declaring module resolution aliases that reflect the
architectural structure of the project.

Additional aliases are provided for shared styling resources (such as variables, mixins, and functions) to enforce a
centralized and predictable styling structure.

---

### [eslint.config.js](https://github.com/workaholic-max/architecture/blob/main/eslint.config.js)

This configuration helps maintain a clean codebase, prevents architectural violations, and ensures that project
structure and conventions are applied consistently.

- Explicit file extensions are required for JavaScript, Vue, and SCSS imports to keep dependencies clear
- Layer-specific aliases (`@router`, `@api`, `@domains`, `@features`, `@shared`) are enforced, while root-level `@/`
  imports into these layers are intentionally forbidden.

---

### [api/](https://github.com/workaholic-max/architecture/tree/main/src/api)

Serves as a single reference for all available interactions with backend and external services.

Endpoints are organized by resource and exported through a single entry point, enforcing consistent naming and
predictable usage.

---

### [api/client.js](https://github.com/workaholic-max/architecture/blob/main/src/api/client.js)

The API client supports abortable requests.

Request cancellation is handled
via [shared/composables/useAbortableRequest.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/composables/useAbortableRequest.js)
allowing requests to be automatically aborted when the user leaves a page or manually cancelled using `abortRequests`
for example when a newer request replaces a previous one.

```
const { sendAbortableRequest } = useAbortableRequest();

onBeforeMount(() => {
    sendAbortableRequest(EmployeesApi.getAll()).then().catch();
});
```

The API client can be further extended with better response interceptors:

- redirect to error page on server errors
- redirect to authentication flow when the user is not authorized
- redirect to maintenance page when the backend is unavailable

---

### [assets/styles/variables/](https://github.com/workaholic-max/architecture/tree/main/src/assets/styles/variables)

Variables are grouped by concern (spacing, colors, breakpoints, etc.) and exposed through a single entry point using
Sass `@forward`. Each group is namespaced at the entry level to keep usage explicit and prevent naming collisions.
Inside individual variable files, names are intentionally kept simple and none prefixed (e.g. `base`, `md`, `lg`).
Context is provided by the namespace rather than repeating prefixes within each file, improving readability and
maintainability.

Usage example:

```
<style lang="scss">
@use '@scss-vars' as vars;

h2 {
  margin-bottom: vars.$space-base;
  font-size: vars.$font-size-md;
  color: vars.$color-primry;
}
</style>
```

---

### [assets/styles/functions/\index.scss](https://github.com/workaholic-max/architecture/blob/main/src/assets/styles/functions/index.scss)

Usage example:

```
<style lang="scss">
@use '@scss-functions' as functions;

ul {
  flex-basis: functions.flex-basis(4, vars.$space-sm);
}
</style>
```

---

### [assets/styles/mixins/\_index.scss](https://github.com/workaholic-max/architecture/blob/main/src/assets/styles/mixins/_index.scss)

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

### [router/composables/useResolvedRoutes.js](https://github.com/workaholic-max/architecture/blob/main/src/router/composables/useResolvedRoutes.js)

This composable centralizes access to `router.resolve()` results and avoids repeated resolution of the same route.
Resolved values are cached by route name and reused across the application to ensure consistent access to route metadata
and generated URLs.

It exposes focused helpers for retrieving commonly needed information, such as:

- resolved route metadata (e.g. title, permissions)
- resolved route hrefs for navigation (e.g. window.location.href = ...)

---

### [shared/directives/click-outside.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/directives/click-outside.js)

In this project, directives are not globally registered. They must be explicitly imported and used only where needed.
This keeps usage transparent and prevents hidden dependencies across the application.

To keep directives predictable and reusable, they must follow a consistent export pattern. Each directive is exported as
a named constant, using the `v` prefix followed by a PascalCase name. The export name directly defines how the directive
is used in templates, automatically mapping to kebab-case.

- Example: exported `vClickOutside`, usage `v-click-outside`
- Naming must be predictable and kebab-case compatible
- Directives may expose additional configuration (e.g. constants)

---

### [shared/components/modal/](https://github.com/workaholic-max/architecture/tree/main/src/shared/components/modal)

This implementation is what I refer to as a `construction`

Exposes a single public entry
point [index.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/components/modal/index.js) that
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
        entity: employee,
        messageSlot: 'message-employee-edit',
        action: () => EmployeesApi.draft.create(employee.id),
        onSuccess: (data) => {
            ...

            confirmationModalRef.value.close(true);
        },
    });
};

const openEmployeeDeleteModal = (employee) => {
    confirmationModalRef.value.open({
        entity: employee,
        cancelBtnText: 'no',
        submitBtnText: 'yes',
        messageSlot: 'message-employee-delete',
        action: () => EmployeesApi.delete(employee.id),
        onSuccess: (data) => {
            ...

            confirmationModalRef.value.close(true);
        },
    });
};

<ConfirmationModal ref="confirmationModalRef">
    <template #message-employee-edit>
      Are you sure you want start editing the employee?
    </template>

    <template #message-employee-delete="{ entity }">
      Are you sure you want to delete {{ entity.name }}?
    </template>
</ConfirmationModal>
```

---

### [shared/configs/limits.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/configs/limits.js)

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

This `control` is responsible for disabling all user interactions for example when overlays, modals, or transitional UI
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
via [router/composables/useResolvedRoutes.js](https://github.com/workaholic-max/architecture/blob/main/src/router/composables/useResolvedRoutes.js),
avoiding redundant configuration and keeping navigation logic centralized and predictable.

---

### [shared/services/device.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/services/device.js)

This service is responsible for determining and exposing information about the current device environment.

At the moment, this includes resolving the active device type. The service must be explicitly initialized before being
used.

Initialization prepares required media queries and listeners and is expected to be executed during application startup
as part of the app initialization flow.

---

### [shared/services/local-storage.js](https://github.com/workaholic-max/architecture/blob/main/src/shared/services/local-storage.js)

This service centralizes access to `localStorage` to ensure safe, predictable behavior and avoid scattering direct
storage
usage across the application.

Stored values are automatically namespaced using a predefined prefix, preventing key collisions with other applications
or environments and keeping stored data clearly identifiable.

Also handles common edge cases, such as invalid JSON data or unavailable storage capacity.
