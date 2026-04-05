<script setup>
import { vClickOutside } from '@shared/directives/click-outside.js';

const props = defineProps({
    value: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
});

// ───────────────────────────────────────────────────────
// Progress state
// ───────────────────────────────────────────────────────

const onClickOutside = () => {
    console.log('onClickOutside');
};

const percentages = computed(() => {
    const { value, max } = props;

    if (value > max) {
        return {
            value: 100,
            overlayValue: ((value - max) / value) * 100,
        };
    }

    return {
        value: (value / max) * 100,
        overlayValue: 0,
    };
});
</script>

<template>
    <div
        v-click-outside="onClickOutside"
        class="ml-progress"
    >
        <div
            role="progressbar"
            class="ml-progress__bar"
            :aria-valuenow="value"
            :aria-valuemin="min"
            :aria-valuemax="max"
            :style="`width: ${percentages.value}%`"
        />

        <div
            role="progressbar"
            class="ml-progress__bar ml-progress__bar--overlay"
            :aria-valuenow="percentages.overlayValue"
            :aria-valuemin="percentages.overlayValue"
            :aria-valuemax="percentages.overlayValue"
            :style="`width: ${percentages.overlayValue}%`"
        />
    </div>
</template>

<style lang="scss" scoped>
@use '@css-vars' as vars;
@use '@css-mixins' as mixins;

.ml-progress {
    position: relative;
    display: flex;
    height: 5px;
    width: 100%;
    background-color: vars.$color-gray-100;
    border-radius: vars.$border-radius-pill;
    box-shadow: inset 0 2px 2px rgba(vars.$color-black, 0.1);
    overflow: hidden;

    &__bar {
        display: flex;
        flex-direction: column;
        background: vars.$color-green;
        border-radius: inherit;
        overflow: hidden;

        @include mixins.transition(width);

        &--overlay {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            background: vars.$color-red;
        }
    }
}
</style>
