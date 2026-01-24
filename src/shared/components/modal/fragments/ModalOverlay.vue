<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';

import { bodyScrollControl } from '@shared/controls/body-scroll.js';
import { interactionControl } from '@shared/controls/interaction.js';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    isOpened: {
        type: Boolean,
        required: true,
    },
    isHidden: {
        type: Boolean,
        default: false,
    },
    isCloseDisabled: {
        type: Boolean,
        default: false,
    },
    disableOutsideClick: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close']);

// ----------------------------------------------------------------------
// Body scroll control
// ----------------------------------------------------------------------

watch(
    () => props.isOpened,
    (isOpened) => {
        if (isOpened) {
            bodyScrollControl.lock();
        } else {
            bodyScrollControl.unlock();
        }
    }
);

onBeforeUnmount(() => {
    if (props.isOpened) {
        bodyScrollControl.unlock();
    }
});

// ----------------------------------------------------------------------
// Interaction control
// ----------------------------------------------------------------------

const isTransitioning = ref(false);

const onTransitionStart = () => {
    isTransitioning.value = true;

    interactionControl.lock();
};

const onTransitionEnd = () => {
    isTransitioning.value = false;

    interactionControl.unlock();
};

onBeforeUnmount(() => {
    if (props.isOpened) {
        interactionControl.unlock();
    }
});

// ----------------------------------------------------------------------
// Modal state
// ----------------------------------------------------------------------

const closeModal = () => {
    if (!isTransitioning.value && props.isOpened && !props.isCloseDisabled) {
        emit('close');
    }
};

const onClickOutside = () => {
    if (!props.disableOutsideClick) {
        closeModal();
    }
};

const onEscapeKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

watch(
    () => props.isOpened,
    (isOpened) => {
        if (isOpened) {
            document.addEventListener('keydown', onEscapeKeydown);
        } else {
            document.removeEventListener('keydown', onEscapeKeydown);
        }
    }
);

onBeforeUnmount(() => document.removeEventListener('keydown', onEscapeKeydown));
</script>

<template>
    <teleport to="body">
        <transition name="modal-overlay">
            <div
                v-if="isOpened && !isHidden"
                class="ml-modal-overlay"
            />
        </transition>

        <transition
            name="modal-dialog"
            @before-enter="onTransitionStart"
            @before-leave="onTransitionStart"
            @after-enter="onTransitionEnd"
            @after-leave="onTransitionEnd"
        >
            <div
                v-if="isOpened"
                class="ml-modal-dialog-overlay"
                :class="{
                    'ml-modal-dialog-overlay--hidden': isHidden,
                }"
                @click="onClickOutside"
            >
                <slot />
            </div>
        </transition>
    </teleport>
</template>

<style lang="scss">
@use '@style-vars' as vars;
@use '@style-mixins' as mixins;

.ml-modal-overlay,
.ml-modal-dialog-overlay {
    position: fixed;
    inset: 0;
}

.ml-modal-overlay {
    background-color: rgba(vars.$color-black, 0.3);
    z-index: vars.$z-index-modal-overlay;
}

.ml-modal-dialog-overlay {
    display: flex;
    flex-direction: column;
    padding: vars.$space-safe-area;
    overflow: auto;
    z-index: vars.$z-index-modal-dialog;

    &--hidden {
        opacity: 0;
    }

    @media screen and (max-width: vars.$breakpoint-mobile-sm) {
        padding: vars.$space-sm 0 0;
    }
}

/* overlay transition */
.modal-overlay-enter-from,
.modal-overlay-leave-to {
    opacity: 0;
}

.modal-overlay-enter-active,
.modal-overlay-leave-active {
    @include mixins.transition-fast(opacity);
}

/* dialog transition */
.modal-dialog-enter-from,
.modal-dialog-leave-to {
    opacity: 0;
    transform: scale(0.975);

    @media screen and (max-width: vars.$breakpoint-mobile-sm) {
        transform: translateY(vars.$space-safe-area);
    }
}

.modal-dialog-enter-active,
.modal-dialog-leave-active {
    @include mixins.transition-fast((opacity, transform));
}
</style>
