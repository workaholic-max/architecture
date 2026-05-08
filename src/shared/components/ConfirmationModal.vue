<script setup lang="ts">
import { Nullable } from '@shared/types/nullable.ts';

import Modal from '@shared/components/modal/index.js';

interface ConfirmationModalConfig {
    enableVerticalActions: boolean;
    title: string;
    message?: string;
    entityName?: string;
    cancelBtnText: string;
    submitBtnText: string;
    messageSlot: string;
    action: () => Promise<unknown>;
    onSuccess: (data: unknown) => void;
    onError?: (error: unknown) => void;
    onClose?: () => void;
}

interface OpenConfirmationModalConfig<T> {
    withDelay?: boolean;
    enableVerticalActions?: boolean;
    title?: string;
    message?: string;
    entityName?: string;
    cancelBtnText?: string;
    submitBtnText?: string;
    messageSlot?: string;
    action: () => Promise<T>;
    onSuccess: (data: T) => void;
    onError?: (error: unknown) => void;
    onClose?: () => void;
}

defineOptions({
    inheritAttrs: false,
});

// ───────────────────────────────────────────────────────
// Confirmation delay
// ───────────────────────────────────────────────────────

let confirmationDelayIntervalId: Nullable<ReturnType<typeof setInterval>> = null;

const confirmationDelayCountdown = ref(0);
const isConfirmationDelayed = ref(false);

const stopConfirmationDelay = (force = false) => {
    if (confirmationDelayIntervalId !== null) {
        clearInterval(confirmationDelayIntervalId);

        confirmationDelayIntervalId = null;
    }

    if (force) {
        confirmationDelayCountdown.value = 0;
        isConfirmationDelayed.value = false;
    }
};

const startConfirmationDelay = () => {
    stopConfirmationDelay(true);

    confirmationDelayIntervalId = setInterval(() => {
        if (confirmationDelayCountdown.value === 0) {
            stopConfirmationDelay();
        } else {
            confirmationDelayCountdown.value--;
        }
    }, 1000);

    confirmationDelayCountdown.value = 5;
    isConfirmationDelayed.value = true;
};

const handleConfirmationDelayCompleted = () => {
    if (confirmationDelayCountdown.value === 0) {
        isConfirmationDelayed.value = false;
    }
};

// ───────────────────────────────────────────────────────
// Confirmation modal state
// ───────────────────────────────────────────────────────

let config: Nullable<ConfirmationModalConfig> = null;

const state = reactive({
    isOpened: false,
    isSubmitting: false,
});

const resolvedConfig = computed(() => config as ConfirmationModalConfig);

const openModal = <T,>({
    withDelay = false,
    enableVerticalActions = false,
    title = 'Confirmation Required',
    message,
    entityName,
    cancelBtnText = 'cancel',
    submitBtnText = 'confirm',
    messageSlot = 'message',
    action,
    onSuccess,
    onError,
    onClose,
}: OpenConfirmationModalConfig<T>) => {
    config = {
        enableVerticalActions,
        title,
        message,
        entityName,
        cancelBtnText,
        submitBtnText,
        messageSlot,
        action,
        onSuccess: (data) => onSuccess(data as T),
        onError,
        onClose,
    };

    if (withDelay) {
        startConfirmationDelay();
    }

    state.isOpened = true;
};

const closeModal = (forceClose = false) => {
    if (config === null) return;

    if (forceClose || !state.isSubmitting) {
        config.onClose?.();

        state.isOpened = false;
        state.isSubmitting = false;

        config = null;

        stopConfirmationDelay(true);
    }
};

const submitAction = () => {
    if (config === null || isConfirmationDelayed.value) return;

    const currentConfig = config;

    state.isSubmitting = true;

    currentConfig
        .action()
        .then((data) => currentConfig.onSuccess(data))
        .catch((error) => currentConfig.onError?.(error));
};

defineExpose({
    open: openModal,
    close: closeModal,
});
</script>

<template>
    <Modal.Overlay
        :is-opened="state.isOpened"
        :is-close-disabled="state.isSubmitting"
        @close="closeModal"
    >
        <Modal.Dialog
            enable-centered-content
            class="ml-confirmation-modal-dialog"
            :enable-vertical-actions="resolvedConfig.enableVerticalActions"
        >
            <template #title>{{ resolvedConfig.title }}</template>

            <template #content>
                <p v-if="resolvedConfig.entityName !== undefined || resolvedConfig.message !== undefined">
                    <template v-if="resolvedConfig.entityName !== undefined">
                        <b>"{{ resolvedConfig.entityName }}"</b>

                        {{ ' ' }}
                    </template>

                    <span v-if="resolvedConfig.message !== undefined">{{ resolvedConfig.message }}</span>
                </p>

                <slot :name="resolvedConfig.messageSlot" />
            </template>

            <template #actions>
                <button
                    type="button"
                    :disabled="state.isSubmitting"
                    @click="closeModal(true)"
                >
                    {{ resolvedConfig.cancelBtnText }}
                </button>

                <button
                    type="button"
                    :disabled="state.isSubmitting || isConfirmationDelayed"
                    @click="submitAction"
                >
                    <transition
                        name="scale"
                        mode="out-in"
                        @before-enter="handleConfirmationDelayCompleted"
                    >
                        <span :key="confirmationDelayCountdown">
                            {{
                                confirmationDelayCountdown > 0
                                    ? confirmationDelayCountdown
                                    : resolvedConfig.submitBtnText
                            }}
                        </span>
                    </transition>
                </button>
            </template>
        </Modal.Dialog>
    </Modal.Overlay>
</template>

<style lang="scss">
@use '@scss-vars' as vars;

.ml-confirmation-modal-dialog.ml-modal-dialog {
    > h5 + .ml-modal-dialog__wrapper {
        margin-top: vars.$space-base * -1;
    }

    .ml-modal-dialog__content {
        font-weight: vars.$font-weight-light;

        > p:not(:last-of-type) {
            margin-bottom: vars.$space-md;
        }
    }
}
</style>
