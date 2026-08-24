<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
</script>

<template>
    <teleport to="body">
        <div
            class="ml-full-screen-overlay"
            role="status"
            aria-live="polite"
        >
            <div class="ml-full-screen-overlay__spinner" />
        </div>
    </teleport>
</template>

<style lang="scss">
@use '@scss-vars' as vars;

.ml-full-screen-overlay {
    position: fixed;
    inset: 0;
    z-index: vars.$z-index-overlay-loader;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(vars.$color-black, 0.5);

    &__spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(vars.$color-white, 0.3);
        border-top-color: vars.$color-white;
        border-radius: 50%;
        animation: ml-full-screen-overlay-spin 0.8s linear infinite;
    }
}

@keyframes ml-full-screen-overlay-spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
