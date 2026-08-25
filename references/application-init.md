# Application Initialization

One ordered entry point installs state management, registers the router, configures packages, and initializes services
before the application mounts.

Full reasoning: [Dev Lab application initialization](https://github.com/workaholic-max/dev-lab/tree/main/code/application-init).

## Repository Adoption

- [`src/app/init/index.ts`](../src/app/init/index.ts) keeps the order explicit: state, router, packages, services.
- Local steps are private fragments; router setup retains its separate owner under `router/`.
- [`src/app/init/fragments/services.ts`](../src/app/init/fragments/services.ts) discovers `*.service.js` and
  `*.service.ts` exports and invokes optional `init()` methods.
- Discovery is used only for independent startup services. Ordered dependencies must be registered explicitly.

The architecture-level rule and trade-offs are summarized in [`ARCHITECTURE.md`](../ARCHITECTURE.md).
