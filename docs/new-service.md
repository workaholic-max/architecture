# Adding a Service

A service owns a runtime capability behind an explicit public API. It belongs to the narrowest layer that owns that
capability: a domain, a feature, or `shared`.

---

## 1. Choose the Owner

Use the location that matches responsibility:

- `src/domains/<domain-name>/services/` for domain-specific behavior;
- `src/features/<feature-name>/services/` for behavior owned by a reusable feature;
- `src/shared/services/` for application-wide or domain-independent behavior.

Do not place a service in `shared` only because its final owner is unclear.

---

## 2. Decide Whether Startup Initialization Is Required

A service that can operate immediately needs only its public methods:

```ts
const execute = () => {
    // Perform the owned runtime operation.
};

export const exampleService = {
    execute,
};
```

A service that requires listeners, external state, or package setup exposes an `init()` method:

```ts
let isInitialized = false;

const init = () => {
    if (isInitialized) return;

    isInitialized = true;
    // Perform one-time setup.
};

const execute = () => {
    if (!isInitialized) {
        throw new Error('exampleService is not initialized.');
    }

    // Perform the owned runtime operation.
};

export const exampleService = {
    init,
    execute,
};
```

Initialization should be idempotent unless repeated initialization is explicitly unsupported.

Failing loudly when a required service is used before initialization is deliberate. Returning a silent fallback hides
an invalid startup order and usually produces a less understandable downstream failure.

---

## 3. Participate in Startup Discovery

Files matching `*.service.ts` or `*.service.js` may be discovered during application startup:

```ts
type ServiceExport = { init?: () => void };

const serviceModules = import.meta.glob<Record<string, ServiceExport>>(
    ['/src/**/*.service.js', '/src/**/*.service.ts'],
    { eager: true }
);

export const initServices = () => {
    Object.values(serviceModules).forEach((module) => {
        Object.values(module).forEach((service) => {
            service.init?.();
        });
    });
};
```

The naming convention makes a service discoverable. Exports without `init()` are safely skipped. Services with
ordering requirements should be registered explicitly instead of relying on discovery order.

Discovery runs during application startup, so adding an independent startup service requires no central registration
change: use the naming convention and expose `init()`.

---

## 4. Keep the Public API Focused

Export the service object directly from its owning layer. Keep internal state and helper functions private unless they
form part of the service contract.

```ts
import { exampleService } from '@shared/services/example.service.ts';

exampleService.execute();
```

---

## 5. Add Tests

Colocate tests with the owning layer. Initialize the service explicitly in tests when required, and reset module-level
state when isolation between tests matters. A test must not assume that another test initialized the service first.

Test:

- initialization and idempotency;
- behavior before required initialization;
- public methods;
- cleanup of listeners or external resources when applicable.

---

## Completion Checklist

- The service lives in the narrowest correct owner.
- Its public API represents one runtime capability.
- `init()` exists only when startup work is required.
- Initialization order is explicit when dependencies exist.
- Internal state is not exposed unnecessarily.
- Relevant behavior is covered by colocated tests.
