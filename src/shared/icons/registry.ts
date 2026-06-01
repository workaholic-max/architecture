// ───────────────────────────────────────────────────────
// Icon names
// ───────────────────────────────────────────────────────

export const ICON_NAMES = {
    ARROW: 'arrow',
    CHECKLIST: 'checklist',
    DELETE: 'delete',
    EDIT: 'edit',
    LOCATION: 'location',
    MENU: 'menu',
    TIMER: 'timer',
    USER: 'user',
    USER_GROUP: 'user-group',
} as const;

export type IconName = (typeof ICON_NAMES)[keyof typeof ICON_NAMES];

// ───────────────────────────────────────────────────────
// Icon modes
// ───────────────────────────────────────────────────────

export const BACKGROUND_IMAGE_ICONS: IconName[] = [ICON_NAMES.CHECKLIST, ICON_NAMES.TIMER];

// ───────────────────────────────────────────────────────
// Icon directions
// ───────────────────────────────────────────────────────

export const ICON_DIRECTIONS = {
    UP: 'up',
    RIGHT: 'right',
    DOWN: 'down',
    LEFT: 'left',
} as const;

export type IconDirection = (typeof ICON_DIRECTIONS)[keyof typeof ICON_DIRECTIONS];
