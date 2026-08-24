# Adding a Feature

A feature encapsulates a reusable concern and owns its internal implementation — it's consumed by `domains` and
higher-level layers, but a feature must **never** depend on a domain. That one-directional rule is the whole reason
the layer exists: if what you're building only makes sense wired into one specific domain, it isn't a feature, it
belongs inside that domain instead. `src/features/forms/` (form-state helpers usable by any domain's forms) is a
real, if small, example already in this codebase.

---

## 1. Create the folder

```
src/features/<feature-name>/
```

A feature has no `routes/` or `views/` — those are domain-only, since a feature isn't a page. Everything else a
domain can have, a feature can too, added only as needed: `api`, `types`, `mocks`, `stores`, `services`, `utils`,
`configs`, `enums`, `composables`, `layouts`, `components`. See
[ARCHITECTURE.md](../ARCHITECTURE.md#features) for the full layer definition.

---

## 2. Build the implementation

Most features start as a single composable, store, or small component group — there's no required starting file the
way a domain requires `routes/`. `src/features/forms/composables/useEntityFormState.ts` is representative: one
focused file solving one reusable problem, exported for any domain to import.

```ts
// src/features/<feature-name>/composables/useSomething.ts
export const useSomething = () => {
    // ...
};
```

---

## 3. Import it from a domain

A domain reaches a feature through the feature's own path alias, never a relative path across the layer boundary:

```ts
// inside a domain
import { useEntityFormState } from '@features/forms/composables/useEntityFormState.ts';
```

The reverse — a feature importing anything under `@domains/*` — is forbidden and enforced by ESLint
(`ARCHITECTURE.md`'s eslint section calls this out explicitly: "Feature-to-domain alias imports are forbidden").
If a feature genuinely needs domain-specific data, that's a sign the logic belongs in `shared` (if it's a
cross-cutting concern with no single owner) or directly in the domain that needs it, not in `features`.

---

## 4. API, if the feature talks to a backend resource

Same shape as a domain's `api.ts` — one function per operation through the shared `apiClient` — surfaced through the
same single entry point, `src/api/index.js`:

```js
// src/api/index.js
export { default as SomethingApi } from '@features/<feature-name>/api.ts';
```

---

## 5. Tests

Colocated, same convention as domains: a local `tests/` folder inside the feature
(`src/features/<feature-name>/tests/`), next to the composable, store, or component it verifies.

---

## When it's not actually a feature

If you find yourself reaching for `@domains/*` from inside a feature to make it work, stop — either the logic
belongs in the domain that needs it, or the shared piece it actually needs (a type, a util, a config) should move to
`shared` instead, where cross-cutting modules with no single owner belong. Forcing a domain dependency into
`features` to avoid duplicating a few lines is the boundary violation ESLint is specifically there to catch.
