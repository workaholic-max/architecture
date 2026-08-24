# API Client

A single, typed wrapper around one `axios` instance, instead of importing `axios` directly all over the codebase —
every call goes through `apiClient.request(...)` rather than `axios.get(...)` / `axios.post(...)` scattered across
call sites. One configured instance, cancellable by default, with a closed-union request shape instead of raw
strings for method and response type.

For the full reasoning, see
[dev-lab/code/axios-api-client](https://github.com/workaholic-max/dev-lab/tree/main/code/axios-api-client).

## Used in this project

[src/api/client.ts](../src/api/client.ts) exports the `apiClient` singleton — built once inside the `ApiClient`
constructor via `axios.create()`, with `withCredentials: true` and the base `X-Requested-With` / `Accept` headers
already set. `request<T>()` is the one method the whole app calls through — [resources/app.ts](../src/api/resources/app.ts)
directly, and every domain's own `api.ts` the same way. It builds headers and request config
(`_buildHeaders` / `_buildRequestConfig`), creates its own `AbortController`, and returns an
[`AbortablePromise<T>`](../src/api/types/abortable-promise.ts) with `.abort()` attached by `_wrapAbort`.

`HttpMethod` and `HttpResponseType` are defined locally in `client.ts`, not shared — nothing outside this file
needs to name either type, matching dev-lab's own copy exactly. There's no `HTTP_METHODS` / `HTTP_RESPONSE_TYPES`
value object either: every call site — [resources/app.ts](../src/api/resources/app.ts), every domain's `api.ts` —
passes a plain literal (`method: 'get'`, `responseType: 'blob'`), checked against `client.ts`'s local types at the
call site itself.

Cancellation is turned into a clean `null` one layer up, in
[shared/composables/useAbortableRequest.ts](../src/shared/composables/useAbortableRequest.ts) — `_handleErrorResponse`
in `client.ts` only tells `axios.isCancel(error)` apart from a real failure; the composable is what decides a
cancelled request resolves to `null` instead of rejecting.

A 401 reloads the app. `_handleErrorResponse` narrows the error with
[shared/utils/http.ts](../src/shared/utils/http.ts)'s `isHttpBackendError` — an object-shape-and-known-status check,
ported from dev-lab's `http-error-catchers` entry — then compares `response.status` against
`HTTP_STATUS_CODES.UNAUTHORIZED` and calls
[shared/stores/app-reload.store.ts](../src/shared/stores/app-reload.store.ts)'s `trigger()` before rethrowing: the
request still rejects normally, but the reload is already locking the page underneath by the time that rejection
reaches its own `.catch()`. `trigger()` flips `isOverlayVisible`, locks scroll and interaction
([shared/controls/body-scroll.js](../src/shared/controls/body-scroll.js) /
[shared/controls/interaction.js](../src/shared/controls/interaction.js) — the same reference-counted locks the modal
system uses), and reloads (or redirects, if given an `href`) after a fixed 2-second delay. There's deliberately no
`untrigger` — by the time the timeout fires the page is being replaced outright, so there's nothing to unlock a
document that's about to stop existing.
[app/components/ReloadOverlay.vue](../src/app/components/ReloadOverlay.vue), mounted once in
[app/App.vue](../src/app/App.vue) alongside `OccurredErrorModal`, is the only thing that reads
`isOverlayVisible` — it renders a plain, prop-less
[shared/components/FullScreenOverlay.vue](../src/shared/components/FullScreenOverlay.vue) at
`$z-index-overlay-loader`, the highest layer in the stack, since once a reload is imminent nothing else on screen
should still read as clickable.

**Not implemented yet:** no per-request auth header — nothing added to `_buildHeaders` for it, the natural place to
add one once real auth exists.
