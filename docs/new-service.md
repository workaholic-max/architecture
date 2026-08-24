# Adding a Service

A service owns a cross-cutting runtime concern — device detection, local storage access, service-worker coordination,
that kind of behavior. Services that need startup initialization participate in the project's auto-discovery mechanism,
so adding one does not require a central registration list.

---

## 1. Naming convention drives startup registration

Any file matching `*.service.ts` or `*.service.js`, anywhere under `src/`, is discovered automatically:

```ts
// src/app/init/fragments/services.ts
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

This runs once, during app startup (see `app/init`). Adding a new service that needs setup work means naming the file
`*.service.ts` and exporting something with an `init()` method; there is no central registration list to update.

---

## 2. Where it lives

- `src/shared/services/` — cross-cutting, used by more than one domain or feature (`device.service.ts`,
  `local-storage.service.ts`, `document.service.ts`, and `pull-to-refresh.service.ts` are current examples).
- `src/domains/<domain>/services/` or `src/features/<feature>/services/` — if the service is genuinely scoped to
  one domain or feature, it lives there instead. The glob pattern discovers it either way; placement is purely
  about which layer actually owns it, same as any other module.

A service that needs no startup work can still live under `services/` and follow the naming convention for ownership and
discoverability. Auto-discovery imports the module but safely skips exports without an `init()` method, as demonstrated
by `service-worker.service.ts` and `local-storage.service.ts`.

---

## 3. Shape

Export an object (or several named exports) with an `init()` method for anything that needs setup, plus whatever
public functions the service exposes. `device.service.ts` is the fullest real example — worth reading directly
rather than duplicating here, but the shape is:

```ts
// src/shared/services/example.service.ts
let state: SomeState | null = null;

const ensureInitialized = () => {
    if (state === null) {
        throw new Error('exampleService is not initialized.');
    }

    return state;
};

const init = () => {
    state = /* set up whatever this service owns */;
};

export const exampleService = {
    init,
    // ...public methods, each calling ensureInitialized() first
};
```

Throwing from `ensureInitialized()` rather than silently returning a default is deliberate — a service used before
`initServices()` has run is a real bug, and failing loudly surfaces it immediately instead of producing a confusing
downstream symptom.

---

## 4. Consuming it

Import the exported object directly, same as anything else — there's no special access pattern once a service is
initialized:

```ts
import { exampleService } from '@shared/services/example.service.ts';

exampleService.someMethod();
```

---

## 5. Tests

Colocated, same convention as everywhere else in this project — a local `tests/` folder next to the service file.
Since a service typically holds module-level state (`state` above), tests usually need to call `init()` explicitly
before asserting behavior, and should not assume a previous test's `init()` call is still in effect.
