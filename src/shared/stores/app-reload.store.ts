import { defineStore } from 'pinia';

import { bodyScrollControl } from '@shared/controls/body-scroll.js';
import { interactionControl } from '@shared/controls/interaction.js';

// ───────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────

export interface TriggerOptions {
    href?: string;
}

// ───────────────────────────────────────────────────────
// Implementation
// ───────────────────────────────────────────────────────

export const useAppReloadStore = defineStore('appReload', () => {
    const isOverlayVisible = ref(false);

    const trigger = (options: TriggerOptions = {}) => {
        isOverlayVisible.value = true;

        bodyScrollControl.lock();
        interactionControl.lock();

        setTimeout(() => {
            if (options.href) {
                window.location.assign(options.href);
            } else {
                window.location.reload();
            }
        }, 2000); // 2s
    };

    return {
        isOverlayVisible,
        trigger,
    };
});
