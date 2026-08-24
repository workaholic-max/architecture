# Adding a Domain

A domain is a user-facing product area — a set of related pages and the logic behind them (`dashboard`,
`employees`, `settings`, ...) — not a backend entity. Confirm that first: if what you're adding doesn't map to a
page or a set of pages a user navigates to, it's probably a [feature](./new-feature.md) instead.

This walks through adding a domain end to end, using a hypothetical `invoices` domain as the running example.

---

## 1. Create the folder

```
src/domains/invoices/
```

Everything below is optional except `routes/` — add only the sub-folders this domain actually needs. See
[ARCHITECTURE.md](../ARCHITECTURE.md#domains) for the full list of what a domain may contain (`api`, `types`,
`mocks`, `stores`, `services`, `utils`, `configs`, `enums`, `composables`, `views`, `layouts`, `components`, `tests`).

---

## 2. Route names

`routes/route-names.ts` — one constant object, prefixed with the domain's own root so names can never collide with
another domain's:

```ts
// src/domains/invoices/routes/route-names.ts
const ROOT = 'invoices';

export const INVOICES_ROUTE_NAMES = {
    INDEX: `${ROOT}.index`,
    CREATE: `${ROOT}.create`,
    EDIT: `${ROOT}.edit`,
} as const;
```

---

## 3. Permission keys

`configs/permissions.ts` — if any route needs access control, define the keys here first so `routes/index.ts` can
reference them:

```ts
// src/domains/invoices/configs/permissions.ts
export const INVOICES_PERMISSION_KEYS = {
    VIEW: 'invoices.view',
    MANAGE: 'invoices.manage',
} as const;

export type InvoicePermissionKey = (typeof INVOICES_PERMISSION_KEYS)[keyof typeof INVOICES_PERMISSION_KEYS];
```

---

## 4. Views

The actual page components, one per route. Keep them under `views/`, nesting a sub-folder per route when a view has
its own supporting components (`views/create/`, `views/edit/`) — see `src/domains/employees/views/` for a real
example of this shape.

---

## 5. The route record

`routes/index.ts` — one exported `RouteRecordRaw`, `path` scoped to the domain, `children` for each page. Every
`component` is a dynamic import (lazy-loaded — see [ARCHITECTURE.md](../ARCHITECTURE.md#lazy-loading)), every route
carries a `title` and, where it matters, a `permission.key`:

```ts
// src/domains/invoices/routes/index.ts
import type { RouteRecordRaw } from 'vue-router';

import { INVOICES_ROUTE_NAMES } from '@domains/invoices/routes/route-names.ts';

import { INVOICES_PERMISSION_KEYS } from '@domains/invoices/configs/permissions.ts';

export const invoicesRoute: RouteRecordRaw = {
    path: 'invoices',
    children: [
        {
            path: '',
            name: INVOICES_ROUTE_NAMES.INDEX,
            component: () => import('@domains/invoices/views/InvoicesView.vue'),
            meta: {
                title: 'Invoices',
                permission: { key: INVOICES_PERMISSION_KEYS.VIEW },
            },
        },
        {
            path: 'create',
            name: INVOICES_ROUTE_NAMES.CREATE,
            component: () => import('@domains/invoices/views/create/InvoiceCreateView.vue'),
            meta: {
                title: 'Create Invoice',
                permission: { key: INVOICES_PERMISSION_KEYS.MANAGE },
            },
        },
    ],
};
```

---

## 6. Wire it into the router

`src/router/routes.ts` composes every domain's route export into one list — this is the **only** place that
imports `@domains/*/routes` directly; nothing else does:

```ts
// src/router/routes.ts
import { invoicesRoute } from '@domains/invoices/routes/index.ts';

const routes: RouteRecordRaw[] = [authRoutes, dashboardRoute, invoicesRoute, /* ... */ ...fallbackRoutes];
```

A domain that's conceptually nested under another one (the way `employees` and `profile` nest under `settings`)
gets spread into that parent route's `children` instead of added top-level — see the `resolvedSettingsRoute`
pattern already in `routes.ts` for exactly that.

---

## 7. Navigation (optional)

If the domain should appear in the main nav, add its route name to `MAIN_NAVIGATION_CONFIG` in
`src/shared/configs/navigation.ts`:

```ts
// src/shared/configs/navigation.ts
export const MAIN_NAVIGATION_CONFIG = [
    DASHBOARD_ROUTE_NAME,
    INVOICES_ROUTE_NAMES.INDEX,
    // ...
] as const;
```

Navigation titles are resolved from route metadata at render time through
[`useResolvedRoutes`](../src/router/composables/useResolvedRoutes.ts). Route permissions remain in the same metadata and
are enforced by the router guard chain when navigation occurs, so neither value is duplicated in the navigation config.

---

## 8. API

If the domain talks to a backend resource, add `api.ts` at the domain root, one function per operation, using the
shared `apiClient`:

```ts
// src/domains/invoices/api.ts
import { apiClient } from '@api/client.ts';

import type { Invoice } from '@domains/invoices/types/invoice.ts';

export default {
    getAll: (params?: Record<string, unknown>) =>
        apiClient.request<Invoice[]>({ method: 'get', url: 'invoices', params }),
};
```

Then surface it through the single API entry point, `src/api/index.js` — this is what every call site actually
imports from, never a domain's `api.ts` directly:

```js
// src/api/index.js
export { default as InvoicesApi } from '@domains/invoices/api.ts';
```

---

## 9. Everything else

Add `types/`, `mocks/`, `stores/`, `enums/`, `utils/`, `composables/`, `components/`, `layouts/` only as the domain
actually needs them — none of these are wired anywhere centrally, they're just conventional folder names a domain
may use internally. `configs/restrictions.ts` (see `employees` for an example) is the place for business rules that
aren't permission-shaped (e.g. "at most N of X").

---

## 10. Tests

Colocate tests in a local `tests/` folder inside the domain (`src/domains/invoices/tests/`), next to what they
verify — see [ARCHITECTURE.md](../ARCHITECTURE.md#testing). Stores, composables, and route permission logic are the
natural things to cover.

---

## Cross-domain dependencies

A domain may depend on another domain only when it represents a real relationship between business areas, and only
one-way — `employees` depending on `profile` is fine, the reverse creating a cycle is not. ESLint enforces the
layer boundaries; it won't catch a cross-domain dependency that's technically one-way but doesn't represent an
actual product relationship — that's a judgment call, not a lint rule.
