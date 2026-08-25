# Icon System

The optional icon system exposes a typed registry and shared renderer instead of one inline SVG component per icon.

Full reasoning: [Dev Lab icon system](https://github.com/workaholic-max/dev-lab/tree/main/code/icon-system).

## Repository Adoption

- Raw SVGs live in [`src/assets/icons/`](../src/assets/icons); renderer code lives in
  [`src/shared/icons/`](../src/shared/icons).
- CSS mask rendering is the single-color default; selected multicolor assets use background-image rendering.
- Directional variants reuse the common renderer.
- Consumers import only [`src/shared/icons/index.ts`](../src/shared/icons/index.ts). ESLint prevents imports from icon
  internals.

This facility can be removed or replaced without changing layer ownership.
