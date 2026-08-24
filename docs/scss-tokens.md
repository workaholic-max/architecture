# SCSS Tokens

A way to reach this project's own SCSS design tokens — colors, spacing, breakpoints, and the rest — the same way from
any file at any nesting depth: one build-tool alias resolved straight to the tokens' own module path, with the
tokens split one partial per category and forwarded through a single barrel under an explicit prefix, instead of a
single flat file everything gets crammed into or a relative import that breaks the moment a file moves.

For the full reasoning — including when this earns its keep over a flat file, and why the alias points at a Sass
module path rather than just the equivalent JS one — see
[dev-lab/code/scss-token-system](https://github.com/workaholic-max/dev-lab/tree/main/code/scss-token-system).

## Used in this project

Three categories, each its own aliased directory, defined once in
[configuration/aliases.js](../configuration/aliases.js) and reused by both Vite's module resolver and — since Vite
forwards `resolve.alias` to Sass module resolution too — every `@use` inside a `.scss` file:

- `@scss-vars` → [assets/styles/abstracts/variables/](../src/assets/styles/abstracts/variables)
- `@scss-mixins` → [assets/styles/abstracts/mixins/](../src/assets/styles/abstracts/mixins)
- `@scss-functions` → [assets/styles/abstracts/functions/](../src/assets/styles/abstracts/functions)

`variables/_index.scss` forwards ten category partials — spacing, border-radius, box-shadow, colors, font-size,
font-weight, font-family, z-index, breakpoints, transition — each under its own prefix at the point of forwarding,
so a category partial itself stays unprefixed (`_colors.scss` defines `$white`, not `$color-white`) while any call
site reaches it as `vars.$color-white`, `vars.$space-sm`, and so on, regardless of how deep the file using it sits.

```scss
@use '@scss-vars' as vars;
@use '@scss-mixins' as mixins;
@use '@scss-functions' as functions;
```

One divergence from dev-lab's own example worth flagging: there, the mixins alias resolves to a single bare partial
sitting directly in `abstracts/`, not a directory — used to illustrate that the alias mechanism handles both shapes.
In this project, `mixins/` and `functions/` are both their own directories with an `_index.scss` each, matching
`variables/` for consistency. So that particular "partial vs. directory" distinction dev-lab documents doesn't
actually get exercised here — all three aliases resolve the exact same way.
