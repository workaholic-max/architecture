<script setup>
defineProps({
    enableCenteredContent: {
        type: Boolean,
        default: false,
    },
    enableVerticalActions: {
        type: Boolean,
        default: false,
    },
});

const slots = defineSlots();
</script>

<template>
    <div
        class="ml-modal-dialog"
        @click.stop
    >
        <h5 v-if="slots['title']">
            <slot name="title" />
        </h5>

        <div
            v-if="slots['content']"
            class="ml-modal-dialog__wrapper"
        >
            <div
                class="ml-modal-dialog__content"
                :class="{
                    'ml-modal-dialog__content--centered': enableCenteredContent,
                }"
            >
                <slot name="content" />
            </div>
        </div>

        <div
            v-if="slots['actions']"
            class="ml-modal-dialog__actions"
            :class="{
                'ml-modal-dialog__actions--vertical': enableVerticalActions,
            }"
        >
            <slot name="actions" />
        </div>
    </div>
</template>

<style lang="scss">
@use '@scss-vars' as vars;
@use '@scss-functions' as functions;

.ml-modal-dialog {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: vars.$space-md * 2;
    width: 100%;
    max-width: vars.$breakpoint-mobile-xs;
    background-color: vars.$color-white;
    padding: vars.$space-md;
    border-radius: vars.$border-radius-base;
    word-break: break-word;
    margin: auto;

    @media screen and (max-width: vars.$breakpoint-mobile-sm) {
        max-width: 100%;
        margin-bottom: 0;
        padding: vars.$space-md vars.$space-safe-area vars.$space-safe-area;
        border-radius: vars.$border-radius-base vars.$border-radius-base 0 0;

        @supports (-webkit-overflow-scrolling: touch) {
            padding-bottom: vars.$space-md;
        }
    }

    > h5 {
        text-align: center;

        > .ml-alert {
            margin-top: vars.$space-base;
        }

        + .ml-modal-dialog__wrapper {
            margin-top: vars.$space-sm * -1;
        }
    }

    .ml-overlay-spinner {
        border-radius: vars.$border-radius-base;
    }

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 0;
    }

    &__content {
        width: 100%;
        max-width: 100%;
        text-align: left;

        &--centered {
            width: auto;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: vars.$space-base;

        @media screen and (max-width: vars.$breakpoint-mobile-sm) {
            flex-direction: column-reverse;
        }

        > .ml-btn {
            flex: 1 1 functions.flex-basis(2);

            @media screen and (max-width: vars.$breakpoint-mobile-sm) {
                flex: auto;
                width: 100%;
            }

            &--filled {
                box-shadow: none;
            }
        }

        &--vertical {
            flex-direction: column-reverse;

            > .ml-btn {
                flex: auto;
                width: 100%;
            }
        }
    }
}
</style>
