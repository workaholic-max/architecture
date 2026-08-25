# Adding a Domain

A domain owns a coherent user-facing product area: its pages, business rules, state, external operations, and local
components. A domain does not need to map one-to-one to a backend entity.

---

## 1. Define the Boundary

Before creating files, describe the domain in one sentence and identify:

- which pages or workflows it owns;
- which business rules belong to it;
- which external resources it accesses;
- whether it needs another domain and, if so, in which dependency direction.

If the proposed module has no user-facing product boundary and is reusable across multiple domains, it may be a feature
instead.

---

## 2. Create the Folder

```text
src/domains/<domain-name>/
```

Add only the structures the domain needs:

```text
<domain-name>/
├─ api.ts
├─ components/
├─ composables/
├─ configs/
├─ enums/
├─ layouts/
├─ mocks/
├─ routes/
├─ services/
├─ stores/
├─ tests/
├─ types/
├─ utils/
└─ views/
```

`routes/` and at least one route-level view form the domain baseline because a domain represents a navigable product
area. Add the remaining structures when the domain owns those responsibilities.

---

## 3. Define Route Names

Prefix route names with the domain name so they remain globally unique:

```ts
const ROOT = '<domain-name>';

export const DOMAIN_ROUTE_NAMES = {
    INDEX: `${ROOT}.index`,
    CREATE: `${ROOT}.create`,
    EDIT: `${ROOT}.edit`,
} as const;
```

---

## 4. Add Permissions When Needed

Keep permission keys with the domain that owns them:

```ts
export const DOMAIN_PERMISSION_KEYS = {
    VIEW: '<domain-name>.view',
    MANAGE: '<domain-name>.manage',
} as const;

export type DomainPermissionKey = (typeof DOMAIN_PERMISSION_KEYS)[keyof typeof DOMAIN_PERMISSION_KEYS];
```

Route metadata may reference these keys, while the router owns permission evaluation.

---

## 5. Add Views and Routes

Create one route-level view per page. Supporting components used by only one view may live beside that view; components
shared across the domain belong in the domain-level `components/` folder.

Expose the domain route record from its `routes/` module:

```ts
import type { RouteRecordRaw } from 'vue-router';

import { DOMAIN_PERMISSION_KEYS } from '../configs/permissions.ts';
import { DOMAIN_ROUTE_NAMES } from './route-names.ts';

export const domainRoute: RouteRecordRaw = {
    path: '<domain-name>',
    children: [
        {
            path: '',
            name: DOMAIN_ROUTE_NAMES.INDEX,
            component: () => import('../views/DomainView.vue'),
            meta: {
                title: 'Domain',
                permission: { key: DOMAIN_PERMISSION_KEYS.VIEW },
            },
        },
    ],
};
```

Register the exported route in the router composition module. Nested product areas may be composed under a parent route
without changing ownership of their source files.

The router composition module is the registry for domain routes. Other domains should not import route records merely
to make them reachable.

---

## 6. Add Navigation When Needed

Navigation configuration should reference route names rather than duplicate paths, titles, or permission rules. Keep
route metadata as the source of truth for page-level information.

---

## 7. Add External API Operations When Needed

Keep domain-specific operations in the domain's `api.ts` module:

```ts
import { apiClient } from '@api/client.ts';

import type { DomainEntity } from './types/entity.ts';

export default {
    getAll: () => apiClient.request<DomainEntity[]>({ method: 'get', url: '<domain-resource>' }),
};
```

Expose the module through the application-wide API entry point. This keeps external operations discoverable while the
domain retains ownership of their implementation.

---

## 8. Add State and Business Logic

Place logic according to ownership:

- stores own domain state;
- services own domain runtime capabilities;
- composables coordinate reusable reactive behavior within the domain;
- utilities contain stateless operations;
- configs and enums define stable domain rules and values;
- types describe the domain's contracts.

Do not create every folder preemptively.

---

## 9. Add Tests

Colocate tests with the domain:

```text
src/domains/<domain-name>/tests/
```

Test business rules, stores, composables, services, and important components through the same imports used by
production code.

---

## Cross-Domain Dependencies

A domain may depend on another domain only when the relationship represents the product. Keep the direction explicit
and one-way. If two domains require the same independent capability, consider extracting a feature or shared primitive
rather than making both domains depend on one another.

Linting can detect prohibited imports and file-level cycles, but it cannot determine whether a technically one-way
dependency represents a valid product relationship. That remains an architectural review decision.

---

## Completion Checklist

- The boundary describes a coherent product area.
- Route names are globally unique.
- Views and local components remain owned by the domain.
- External operations and business rules have clear owners.
- Cross-domain dependencies are justified and one-directional.
- Only required folders were created.
- Relevant behavior is covered by colocated tests.
