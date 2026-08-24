# Section Comments

A convention for separating logical blocks inside a file — types, state, handlers, lifecycle — so a file's structure
is visible at a glance before reading a single line of logic.

```ts
// ───────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────
```

For the full reasoning and editor setup (a WebStorm Live Template that expands the divider on a keystroke), see
[dev-lab/code-style/section-comments](https://github.com/workaholic-max/dev-lab/tree/main/code-style/section-comments).

## Used in this project

Applied to files with more than two or three distinct concerns — see `src/shared/components/modal/fragments/ModalOverlay.vue`,
`src/shared/components/ProgressBar.vue`, `src/shared/icons/registry.ts`, `src/app/App.vue`,
`src/app/components/OccurredErrorModal.vue` (its `// Modal state` divider), or `src/api/client.ts` (`// Types` /
`// Implementation`) for real examples already in the codebase. Not every file needs it — a short single-purpose file
gets nothing from a divider it doesn't have room to separate anything with.

Only add a named preset (beyond the default `section-comment` template) for a title that names one real, recurring
block across the codebase — not one per component just because a component exists.
