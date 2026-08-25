# Progressive Web App

Progressive Web App support is an optional implementation package: install metadata, offline assets, update handling,
and an iOS standalone pull-to-refresh replacement.

Full reasoning: [Dev Lab Progressive Web App](https://github.com/workaholic-max/dev-lab/tree/main/code/progressive-web-app).

## Repository Adoption

- [`configuration/vite/plugins/pwa.js`](../configuration/vite/plugins/pwa.js) configures the manifest, generated
  service worker, asset precaching, and automatic updates. Development service workers remain disabled.
- [`index.html`](../index.html) contains install and social-preview metadata that the manifest does not cover.
- [`src/shared/services/service-worker.service.ts`](../src/shared/services/service-worker.service.ts) checks for a
  controlling worker during startup. Its update lookup handles rejection so startup can continue.
- [`src/shared/services/pull-to-refresh.service.ts`](../src/shared/services/pull-to-refresh.service.ts) enables the
  replacement gesture only for iOS standalone mode and respects the body-scroll lock.
- Public icons, favicons, fonts, and social images support presentation; they do not define the architecture.

Before deployment, replace the placeholder social-preview origin in `index.html` with the real public origin.

Related reasoning: [service-worker activation](https://github.com/workaholic-max/dev-lab/tree/main/code/ensure-service-worker-activated)
and [pull to refresh](https://github.com/workaholic-max/dev-lab/tree/main/code/pull-to-refresh).
