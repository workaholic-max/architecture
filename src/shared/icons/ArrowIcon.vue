<script setup lang="ts">
import Icon from './Icon.vue';
import type { IconDirection } from './registry.ts';
import { ICON_DIRECTIONS, ICON_NAMES } from './registry.ts';

withDefaults(
    defineProps<{
        size?: number;
        direction?: IconDirection;
    }>(),
    {
        size: 18,
        direction: ICON_DIRECTIONS.RIGHT,
    }
);
</script>

<template>
    <div
        class="ml-arrow-icon"
        :class="`ml-arrow-icon--${direction}`"
    >
        <Icon
            :name="ICON_NAMES.ARROW"
            :size="size"
        />
    </div>
</template>

<style lang="scss" scoped>
.ml-arrow-icon {
    flex-shrink: 0;

    &--up {
        transform: rotate(-90deg);
    }

    &--down {
        transform: rotate(90deg);
    }

    &--left {
        transform: rotate(180deg);
    }

    &--right > .ml-icon,
    &--left > .ml-icon {
        transform: translateX(calc(var(--icon-size) * 0.25));
    }
}
</style>
