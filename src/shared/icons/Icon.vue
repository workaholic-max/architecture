<script setup lang="ts">
import type { IconName } from './registry.ts';
import { BACKGROUND_IMAGE_ICONS } from './registry.ts';

const props = withDefaults(
    defineProps<{
        name: IconName;
        size?: number;
    }>(),
    {
        size: 24,
    }
);

// ───────────────────────────────────────────────────────
// Icon state
// ───────────────────────────────────────────────────────

const iconClass = computed(() => {
    const { name } = props;

    return [
        `ml-icon--${name}`,
        {
            'ml-icon--bg-img': BACKGROUND_IMAGE_ICONS.includes(name),
        },
    ];
});

const iconStyle = computed(() => ({
    '--icon-size-base': `${props.size}px`,
}));
</script>

<template>
    <div
        class="ml-icon"
        :class="iconClass"
        :style="iconStyle"
    />
</template>

<style lang="scss">
@use '@scss-vars' as vars;
@use '@scss-mixins' as mixins;

.ml-icon {
    --icon-url: none;
    --icon-size: var(--icon-size-base);
    --icon-color: #{vars.$color-primary};

    flex-shrink: 0;
    width: var(--icon-size);
    height: var(--icon-size);

    &:not(&--bg-img) {
        background-color: var(--icon-color);
        mask-image: var(--icon-url);
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;
        -webkit-mask-image: var(--icon-url);
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
        -webkit-mask-size: contain;

        @include mixins.transition(background-color);
    }

    &--bg-img {
        background-image: var(--icon-url);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    &--arrow {
        --icon-url: url('@/assets/icons/arrow.svg');
    }

    &--checklist {
        --icon-url: url('@/assets/icons/checklist.svg');
    }

    &--delete {
        --icon-url: url('@/assets/icons/delete.svg');
    }

    &--edit {
        --icon-url: url('@/assets/icons/edit.svg');
    }

    &--location {
        --icon-url: url('@/assets/icons/location.svg');
    }

    &--menu {
        --icon-url: url('@/assets/icons/menu.svg');
    }

    &--timer {
        --icon-url: url('@/assets/icons/timer.svg');
    }

    &--user {
        --icon-url: url('@/assets/icons/user.svg');
    }

    &--user-group {
        --icon-url: url('@/assets/icons/user-group.svg');
    }
}
</style>
