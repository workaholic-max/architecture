# API Client

External requests pass through one typed Axios client rather than configuring Axios independently at each call site.

Full reasoning: [Dev Lab Axios API client](https://github.com/workaholic-max/dev-lab/tree/main/code/axios-api-client).

## Repository Adoption

- [`src/api/client.ts`](../src/api/client.ts) owns the base URL, credentials, common headers, response interception,
  typed request options, and per-request cancellation.
- Requests resolve to response data and expose `abort()` through the transport-specific promise type.
- [`src/shared/composables/useAbortableRequest.ts`](../src/shared/composables/useAbortableRequest.ts) tracks a
  component's requests, cancels them on unmount, and separates cancellation from genuine failure.
- A global unauthorized response triggers the application reload flow; operation-specific error handling stays with
  the caller.
- No per-request authorization header is currently added. The shared header builder is the intended extension point.

Related reasoning: [abortable request tracking](https://github.com/workaholic-max/dev-lab/tree/main/code/use-abortable-request),
[HTTP error catchers](https://github.com/workaholic-max/dev-lab/tree/main/code/http-error-catchers), and
[application reload](https://github.com/workaholic-max/dev-lab/tree/main/code/app-reload).
