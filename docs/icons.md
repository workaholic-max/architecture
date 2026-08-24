# Icons

Centralized icon rendering built on CSS `mask-image` and `background-image` — one shared `Icon.vue` renderer instead
of one inline SVG component per icon.

For the reasoning behind this approach — DOM cost at scale, the mask-vs-background-image tradeoff, accessibility
considerations, and how it compares to inline SVG / icon fonts / sprite sheets — see
[dev-lab/code/icon-system](https://github.com/workaholic-max/dev-lab/tree/main/code/icon-system).

## Folder Structure

```
src/
├─ assets/
│  └─ icons/
│     ├─ arrow.svg
│     ├─ checklist.svg
│     ├─ edit.svg
│     └─ ...
│
├─ shared/
│  └─ icons/
│     ├─ ArrowIcon.vue
│     ├─ Icon.vue
│     ├─ index.ts
│     └─ registry.ts
```

---

## SVG Files

All raw SVG files must be placed inside `src/assets/icons`.

### Size

SVG files must use a square viewBox:

```
width="24"
height="24"
viewBox="0 0 24 24"
```

### Visual Balance

Icons must be visually centered inside the 24×24 area. Mathematical centering is not always visually correct — some
icons need small optical offsets. Figma is currently used to normalize icon alignment, spacing, and visual balance.

### Colors

Default icon color: `#FFA000`, exposed by the SCSS token system as `vars.$color-primary`.

For single-color icons intended for `mask-image` rendering, the SVG itself should still use the default primary
color. For multicolor icons intended for `background-image` rendering, use the final intended colors directly inside
the SVG.

---

## Icon Names

All icon names are defined inside `src/shared/icons/registry.ts`:

```ts
export const ICON_NAMES = {
    EDIT: 'edit',
    LOCATION: 'location',
    MENU: 'menu',
} as const;
```

SVG file names must match the icon name (`ICON_NAMES.EDIT` → `edit.svg`). `ICON_NAMES` must remain alphabetically
ordered.

---

## Rendering Mode

Mask mode (CSS `mask-image`) is the default and supports runtime color customization, but only a single visible
color at a time. Icons that need to keep more than one color opt into background-image mode by being listed in
`BACKGROUND_IMAGE_ICONS`:

```ts
export const BACKGROUND_IMAGE_ICONS: IconName[] = [ICON_NAMES.CHECKLIST, ICON_NAMES.TIMER];
```

See the dev-lab link above for why both modes exist rather than just one.

---

## Directional Icons

Some icons support directional rendering (`ArrowIcon`). Directions are defined in `ICON_DIRECTIONS`:

```ts
export const ICON_DIRECTIONS = {
    UP: 'up',
    RIGHT: 'right',
    DOWN: 'down',
    LEFT: 'left',
} as const;
```

Directional icons internally use rotation and positioning logic while still rendering through the centralized
`Icon.vue` renderer.

---

## Imports

All icon-related imports must go through `src/shared/icons/index.ts`. Direct imports from internal files are
forbidden — this is enforced by ESLint.

```ts
// Correct
import { Icon, ICON_NAMES } from '@shared/icons/index.ts';
import { ArrowIcon, ICON_DIRECTIONS } from '@shared/icons/index.ts';

// Incorrect
import Icon from '@shared/icons/Icon.vue';
```

Internal files inside the icons module use relative imports (`import Icon from './Icon.vue';`) to keep the module
isolated.

---

## Usage

```
<Icon :name="ICON_NAMES.EDIT" />
<Icon :name="ICON_NAMES.MENU" :size="20" />

<ArrowIcon :size="15" />
<ArrowIcon :size="15" :direction="isAccordionOpened ? ICON_DIRECTIONS.UP : ICON_DIRECTIONS.DOWN" />
```

---

## Size & Color System

Two CSS custom properties drive sizing and color, overridable contextually without touching the component API:

```css
.some-layout {
    --icon-size: 40px;
    --icon-color: #{vars.$color-orange-dark};
}
```

`--icon-size-base` comes from the component's `size` prop. `--icon-size` and `--icon-color` are ordinary custom
properties a parent can override for hover states, responsive resizing, or contextual theming.
