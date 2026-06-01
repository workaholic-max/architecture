# Icons

This project uses a centralized icon rendering system based on CSS `mask-image` and `background-image`.

The icon system was designed to reduce DOM/rendering overhead caused by large amounts of inline SVG components rendered
in repeated lists and dynamic UI sections.

The system provides:

- centralized icon rendering
- centralized icon naming
- reusable directional icons
- contextual size overrides
- contextual color overrides
- reduced DOM complexity
- consistent icon normalization

---

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

All raw SVG files must be placed inside:

```
src/assets/icons
```

### Size

SVG files must use:

```
width="24"
height="24"
viewBox="0 0 24 24"
```

Icons must always use a square viewBox.

---

### Visual Balance

Icons must be visually centered inside the 24×24 area.

Mathematical centering is not always visually correct.

Some icons may require small optical offsets to appear visually balanced.

Figma is currently used to normalize icon alignment, spacing, and visual balance.

---

### Colors

Default icon color:

```
#CF382F
```

For single-color icons intended for `mask-image` rendering, the SVG itself should still use the default primary color.

For multicolor icons intended for `background-image` rendering, use the final intended colors directly inside the SVG.

---

## Rendering Modes

The icon system supports two rendering modes.

---

### Mask Image Mode

Default rendering mode.

Uses:

```
mask-image
```

**Benefits:**

- runtime color customization
- hover color transitions
- contextual color overrides

**Limitations:**

- supports only a single visible color at a time

---

### Background Image Mode

Uses:

```
background-image
```

**Benefits:**

- supports multicolor SVGs
- preserves original SVG colors

**Limitations:**

- runtime color customization is not supported

---

## Icon Names

All icon names are defined inside:

```
src/shared/icons/registry.ts
```

Example:

```
export const ICON_NAMES = {
    EDIT: 'edit',
    LOCATION: 'location',
    MENU: 'menu',
} as const;
```

### File Name Matching

SVG file names must match the icon name.

Example:

```
ICON_NAMES.EDIT ('edit')
→ edit.svg
```

---

### Alphabetical Order

`ICON_NAMES` must remain alphabetically ordered.

This improves:

- readability
- discoverability
- maintenance

---

## Background Image Icons

Icons rendered using `background-image` are defined inside:

```
BACKGROUND_IMAGE_ICONS
```

Example:

```
export const BACKGROUND_IMAGE_ICONS: IconName[] = [ICON_NAMES.CHECKLIST, ICON_NAMES.TIMER];
```

---

## Directional Icons

Some icons support directional rendering.

Examples:

- `ArrowIcon`

Directions are defined inside:

```
ICON_DIRECTIONS
```

Example:

```
export const ICON_DIRECTIONS = {
    UP: 'up',
    RIGHT: 'right',
    DOWN: 'down',
    LEFT: 'left',
} as const;
```

Directional icons internally use rotation and positioning logic while still rendering through the centralized `Icon.vue`
renderer.

---

## Imports

All icon-related imports must be performed through:

```
src/shared/icons/index.ts
```

Direct imports from internal files are forbidden.

Correct:

```
import { Icon, ICON_NAMES } from '@shared/icons/index.ts';

import { ArrowIcon, ICON_DIRECTIONS } from '@shared/icons/index.ts';
```

Incorrect:

```
import Icon from '@shared/icons/Icon.vue';
```

This convention is enforced by ESLint.

---

### Relative Imports

Internal files inside the icons module must use relative imports.

Example:

```
import Icon from './Icon.vue';
```

This keeps the module isolated and prevents dependency coupling.

---

## Icon Component

`Icon.vue` is the centralized base renderer used by all icons.

Example:

```
<Icon :name="ICON_NAMES.EDIT" />

<Icon :name="ICON_NAMES.MENU" :size="20" />
```

---

## Directional Icon Usage

Example:

```
<ArrowIcon :size="15" />
```

Dynamic direction example:

```
<ArrowIcon :size="15" :direction="isAccordionOpened ? ICON_DIRECTIONS.UP : ICON_DIRECTIONS.DOWN" />
```

---

## Icon Size System

The icon system uses two size variables:

```
--icon-size-base
--icon-size
```

### --icon-size-base

Default size provided by the component.

Example:

```
<Icon :name="ICON_NAMES.EDIT" :size="20" />
```

---

### --icon-size

Final rendered size.

Can be overridden contextually through CSS.

Example:

```
.some-layout {
    --icon-size: 40px;
}
```

**This allows:**

- contextual resizing
- hover resizing
- state-based resizing
- layout-based resizing

without overriding the component API.

---

## Icon Color System

The icon system uses:

```
--icon-color
```

Example:

```
--icon-color: #{vars.$color-orange-dark};
```

This allows contextual color customization while preserving centralized icon rendering behavior.
