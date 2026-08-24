# Application Init

A single ordered entry point that boots the app by running a fixed sequence of independent setup steps exactly once,
before it mounts — state management first, then the router, then one-off library setup, then every service's
auto-discovered `init()` — instead of scattering one-time setup calls across whichever file happens to run first.

For the full reasoning — including why the call order matters even though nothing enforces it, and the tradeoffs of
auto-discovering services by filename instead of a hand-maintained list — see
[dev-lab/code/application-init](https://github.com/workaholic-max/dev-lab/tree/main/code/application-init).

## Used in this project

[app/init/index.ts](../src/app/init/index.ts) and its three `fragments/` —
[pinia.ts](../src/app/init/fragments/pinia.ts), [packages.js](../src/app/init/fragments/packages.js),
[services.ts](../src/app/init/fragments/services.ts) — match dev-lab's own copies exactly, aside from `initRouter`
being imported via the `@router` alias ([router/init/index.ts](../src/router/init/index.ts)) rather than a relative path, since
this project has a real alias system where dev-lab's reference entries don't.

Call order is `initPinia → initRouter → initPackages → initServices`: state before router, since the router's guard
chain may need a store to already exist; router before services, since a service's `init()` might need a live route.
Nothing in the code enforces that order — reordering two steps that secretly depend on each other fails silently,
not with a type error.
