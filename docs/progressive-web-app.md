# Progressive Web App

The application is installable and works offline. Four pieces make that true, each solving a distinct problem, wired
together only by living in or around the same `index.html` build:

- a build-time plugin that generates the manifest and service worker
- `<head>` tags covering install presentation and social-link previews that the generated manifest can't reach on its
  own
- a startup gate that waits for a newly-activated service worker to actually take control before the app renders
- a hand-rolled pull-to-refresh gesture for the one platform that loses its native one once installed

Each is documented below with the reasoning behind it and the exact shape it takes in this codebase. The fuller
write-ups this doc condenses live in dev-lab, linked from each section.

---

## Manifest & service worker

[vite-plugin-pwa](https://www.npmjs.com/package/vite-plugin-pwa) turns the build into an installable, offline-capable
app: a generated `manifest.webmanifest` is what lets a browser or OS offer "install" / "add to home screen" instead of
the app staying a bare tab with no icon or dedicated window, and a Workbox-backed service worker precaches the built
app shell so it keeps loading with no network instead of failing the instant connectivity drops. Updates apply
themselves — a new deploy takes over every already-open tab on its own, rather than waiting for the user to close and
reopen the app.

For the full reasoning behind each config field, see
[dev-lab/code/progressive-web-app/PLUGIN.md](https://github.com/workaholic-max/dev-lab/tree/main/code/progressive-web-app/PLUGIN.md).

**Used in this project:**

Configured in [configuration/vite/plugins/pwa.js](../configuration/vite/plugins/pwa.js) and wired into
[vite.config.ts](../vite.config.ts).

- `registerType: 'autoUpdate'` + `skipWaiting` / `clientsClaim` — the new worker takes over immediately, no user
  prompt; this is exactly why the app needs the startup gate below.
- `manifest.icons` lists both a plain and a `maskable` variant at 192×192 and 512×512
  ([public/images/icons/](../public/images/icons)) — the maskable pair exists because Android adaptively crops
  home-screen icons, and an icon with no safe-zone-aware maskable variant gets cropped unpredictably.
- `includeAssets` lists the favicon files ([public/images/favicons/](../public/images/favicons)) that
  `index.html` links to directly but nothing in the JS/CSS build graph imports — without listing them here, Workbox
  has no way to know they exist and they'd be missing from the precache once offline.
- `workbox.globPatterns` (`**/*.{html,css,js,ico,woff2,png,svg}`) is the fixed manifest of files fetched once and
  cached the moment the service worker installs — not a per-request decision.
- `devOptions.enabled: false` keeps the generated service worker out of the dev server entirely, so local iteration
  never runs against a stale worker.

---

## Install presentation

A generated manifest covers some install presentation (name, theme color, display mode) but not all of it — iOS's
status bar style, most notably, has no manifest field at all and exists only as a `<head>` tag.

For the full reasoning behind each tag, see
[dev-lab/code/progressive-web-app/META-TAGS.md](https://github.com/workaholic-max/dev-lab/tree/main/code/progressive-web-app/META-TAGS.md).

**Used in this project**, all in [index.html](../index.html):

- `apple-mobile-web-app-capable` + `apple-mobile-web-app-status-bar-style: black-translucent` — removes Safari's
  browser chrome on a home-screen launch and lets the app's own content draw underneath the status bar. Because
  `black-translucent` does that, any full-bleed header in this project needs to reserve that space itself with
  `env(safe-area-inset-top)` padding — picking this style without that padding is how real UI ends up sitting under
  the status bar instead of blending with it.
- `apple-touch-icon` + `apple-mobile-web-app-title` — the icon and label iOS actually uses for the home screen,
  independent of the ordinary favicon `<link>` set and the manifest's own `name`.
- `mobile-web-app-capable` + `application-name` — the non-Apple equivalents, read by Android browsers and
  Windows/Edge tiles, since nothing prefixed `apple-` means anything to either.
- `theme-color` (`#ffa000`) and the `manifest` link are the only two lines here the manifest also expresses — this
  copy is what reaches plain browser chrome (an Android address bar, a pinned Windows tile) outside of an install.

---

## Social preview

Not PWA-specific — any shared link benefits — but kept in the same `<head>` block as the tags above. Open Graph and
Twitter Card tags are what give a link its own preview card (title, image, description) when pasted into Slack,
iMessage, or X, in place of the bare title-and-URL line a scraper falls back to otherwise.

For the full reasoning behind each field, see
[dev-lab/code/progressive-web-app/SOCIAL-PREVIEW.md](https://github.com/workaholic-max/dev-lab/tree/main/code/progressive-web-app/SOCIAL-PREVIEW.md).

**Used in this project:**

[public/images/og/social-preview.png](../public/images/og/social-preview.png) is a real 1200×630 card, not a
placeholder — dark background, the project's `#ffa000` theme color as the accent, the app name, and the tech stack.
`og:image:width` / `og:image:height` are set to match, since Facebook's and Slack's unfurlers use them to reserve
layout space before the image itself loads.

`og:url` and the `og:image` / `twitter:image` origin currently point at a placeholder domain
(`architecture.example.com`) in [index.html](../index.html) — `og:url` has to be the page's real, absolute URL per
the Open Graph spec, and it fails silently (the card still renders, just pointing at the wrong place) rather than
loudly, which is the easiest way for this to go unnoticed. **Replace it with the real deployed domain before sharing
a link.**

---

## Ensuring the service worker is activated

A backend deploy takes effect the moment it ships; a frontend behind a service worker doesn't, until a new worker
actually activates. Without waiting for that, a page can keep running against an API contract the loaded frontend
was never built against — exactly the risk `registerType: 'autoUpdate'` above introduces, since a new worker can take
over an already-open tab mid-session with no prompt.

For the full reasoning, see
[dev-lab/code/ensure-service-worker-activated](https://github.com/workaholic-max/dev-lab/tree/main/code/ensure-service-worker-activated).

**Used in this project:**

[shared/services/service-worker.service.ts](../src/shared/services/service-worker.service.ts) exposes
`ensureActivated()`: if there's no existing controller (fresh install, or no service-worker support at all) it
resolves immediately; otherwise it confirms a real registration, arms a 7-second timeout, and checks for an update —
resolving cleanly, reloading the page outright if a `controllerchange` fires mid-check, or falling back to the
timeout if the check itself hangs.

One deliberate divergence from dev-lab's own copy: the registration/update step here is a named `updateRegistration`
function called as `updateRegistration().catch(resolveOnce)`, rather than dev-lab's unhandled `void (async () =>
{...})()`. That's not a rewrite for its own sake — dev-lab's version has no `.catch()` on that IIFE at all, so an
outright rejection from `getRegistration()` itself (not just a hang, an actual rejection) would go unhandled and
`ensureActivated()` would never resolve, stalling boot indefinitely. The `.catch(resolveOnce)` here closes that one
specific gap. It doesn't fix the hang case dev-lab's own docs already call out — a promise that never settles isn't
caught by `.catch()` either — so `getRegistration()` truly hanging is still unbounded in both versions.

It's called exactly once, by hand, from [app/App.vue](../src/app/App.vue)'s `onBeforeMount`, gating `router-view`
behind an `isAppStateLoading` flag — the same flag that also covers `App.vue`'s own app-state fetch. While it's
`true`, `App.vue` shows
[shared/components/FullScreenOverlay.vue](../src/shared/components/FullScreenOverlay.vue) — the same reusable,
prop-less overlay [docs/api-client.md](api-client.md)'s session-reload flow uses — rather than rendering nothing.

One naming note: this file is named `service-worker.service.ts`, matching the `*.service.ts` convention every other
auto-discovered service in [app/init/fragments/services.ts](../src/app/init/fragments/services.ts) follows — but
it deliberately exports no `init()`. `initServices()` calls `service.init?.()` on every discovered export, so a
module with no `init` is simply skipped rather than needing a different file name to opt out. The guarantee this
entry depends on — that it's _awaited_, not fired-and-forgotten — is preserved by the single call site in `App.vue`,
not by the file name.

---

## Pull to refresh

Mobile Safari gives pull-to-refresh for free in a regular browser tab. An iOS PWA running in standalone mode (added
to the home screen, launched without Safari's chrome) loses that — there's no browser UI left to provide the
gesture, so the app has to implement it itself if it wants the behavior back.

For the full reasoning, see
[dev-lab/code/pull-to-refresh](https://github.com/workaholic-max/dev-lab/tree/main/code/pull-to-refresh).

**Used in this project:**

[shared/services/pull-to-refresh.service.ts](../src/shared/services/pull-to-refresh.service.ts) gates itself
internally, inside its own `init()`, on `navigator.standalone` and an iOS user-agent check — deliberately scoped to
iOS standalone only, since a regular browser tab and Android PWAs already have this gesture natively. Because the
gating lives inside `init()` rather than at the call site, this joins the same auto-discovered `*.service.ts` set
every other service does, with no special-casing in
[app/init/fragments/services.ts](../src/app/init/fragments/services.ts).

`touchstart` records a start position only when the page hasn't been scrolled down; `touchend` reloads only if the
drag crossed `REFRESH_THRESHOLD` (200px) while the page is still unscrolled. There's no visual feedback during the
drag — it's all-or-nothing at release, not a continuously-tracked gesture.

It also checks
[shared/controls/body-scroll.js](../src/shared/controls/body-scroll.js)'s `bodyScrollControl.isLocked()` before
arming — added to that control specifically for this — so the gesture stays disabled for as long as a modal, drawer,
or other overlay has scroll locked. Reloading the whole app out from under an open overlay because of a drag meant to
interact with it would be a jarring, unrelated side effect.

---

## Offline error state

[app/components/OccurredErrorModal.vue](../src/app/components/OccurredErrorModal.vue) reads `navigator.onLine`
once and swaps its title to "No internet connection", hiding the error-detail slot entirely when offline — a caught
error's stack-trace-adjacent message isn't useful information when the actual cause is that the network is down.
