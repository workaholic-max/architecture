# Adding a Feature

A feature owns a reusable application capability. It is consumed by domains or higher-level composition, but it must
never depend on a domain.

If the behavior makes sense only inside one business area, keep it in that domain. Move it into `features/` when the
capability has an independent responsibility and a reusable contract.

---

## 1. Choose the Owner

Before creating the folder, confirm that the capability:

- is not a route-level product area;
- is not merely a generic technical primitive;
- can be described without naming a specific domain;
- does not require domain imports to function.

---

## 2. Create the Folder

```text
src/features/<feature-name>/
```

Add only the structures the feature needs:

```text
<feature-name>/
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

Features do not contain route-level views or route registration.

---

## 3. Define the Public Capability

Most features begin with one composable, store, service, utility, or component group. Define the owned contract first
and keep the initial API focused:

```ts
// types/feature.ts
export interface FeatureOptions {
    enabled: boolean;
}
```

```ts
// composables/useFeatureState.ts
import { ref } from 'vue';

import type { FeatureOptions } from '../types/feature.ts';

export const useFeatureState = (options: FeatureOptions) => {
    const isEnabled = ref(options.enabled);

    return { isEnabled };
};
```

Use a feature-level entry point when consumers should not import internal files directly:

```ts
export { useFeatureState } from './composables/useFeatureState.ts';
export type { FeatureOptions } from './types/feature.ts';
```

---

## 4. Consume the Feature

A domain imports the feature through the feature alias or its public entry point. Do not use a relative path to cross a
layer boundary.

```ts
import { useFeatureState } from '@features/<feature-name>/index.ts';
```

The feature remains unaware of which domains consume it.

---

## 5. Keep Dependencies Directional

A feature may depend on shared primitives and external infrastructure. It must not import domain code.

```ts
// Allowed
import type { Nullable } from '@shared/types/utility.ts';

// Forbidden
import type { DomainEntity } from '@domains/example/types/entity.ts';
```

If domain-specific data is required, pass it through a generic feature contract or keep the behavior in the domain.

---

## 6. Add External API Operations When Needed

A feature that owns backend operations may expose an `api.ts` module through the shared API client:

```ts
import { apiClient } from '@api/client.ts';

export default {
    get: () => apiClient.request<unknown>({ method: 'get', url: 'feature-resource' }),
};
```

Register it in the application-wide API entry point so external operations remain discoverable without transferring
ownership out of the feature.

---

## 7. Add Tests

Colocate tests with the feature:

```text
src/features/<feature-name>/tests/
```

Test the feature through the same public contract that production consumers use. Keep global test setup outside the
feature.

---

## When It Is Not a Feature

If implementation requires a domain import, the behavior belongs in that domain or needs a smaller domain-independent
contract. Do not move domain types or rules into `shared` only to make a feature boundary compile; move only the truly
reusable primitive.

---

## Completion Checklist

- The feature has a responsibility independent of any domain.
- It imports no domain modules.
- Its folder contains only structures it actually uses.
- Its public contract does not expose unnecessary implementation details.
- Relevant behavior is covered by colocated tests.
