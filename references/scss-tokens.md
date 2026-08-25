# SCSS Tokens

The optional styling system exposes variables, mixins, and functions through stable aliases so styles do not depend on
relative paths.

Full reasoning: [Dev Lab SCSS token system](https://github.com/workaholic-max/dev-lab/tree/main/code/scss-token-system).

## Repository Adoption

- [`configuration/aliases.js`](../configuration/aliases.js) defines aliases for variables, mixins, and functions.
- [`src/assets/styles/abstracts/`](../src/assets/styles/abstracts) keeps each category behind an index module.
- Variable categories are forwarded with prefixes, producing names such as `vars.$color-primary` and
  `vars.$space-sm`.
- Unlike the Dev Lab example's mixed file/directory shapes, all three repository aliases resolve to directories with
  `_index.scss` entry points.

Another styling approach may replace this without changing the architecture.
