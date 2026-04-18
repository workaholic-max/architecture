<script setup>
import Modal from '@shared/components/modal/index.js';

defineOptions({
    inheritAttrs: false,
});

// ───────────────────────────────────────────────────────
// Confirmation delay
// ───────────────────────────────────────────────────────

let confirmationDelayIntervalId;

const confirmationDelayCountdown = ref(0);
const isConfirmationDelayed = ref(false);

const stopConfirmationDelay = () => {
    clearInterval(confirmationDelayIntervalId);
};

const startConfirmationDelay = () => {
    stopConfirmationDelay();

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

const config = {
    enableVerticalActions: false,
    title: null,
    message: null,
    entityName: null,
    cancelBtnText: null,
    submitBtnText: null,
    messageSlot: null,
    action: null,
    onSuccess: null,
    onError: null,
    onClose: null,
};

const state = reactive({
    isOpened: false,
    isSubmitting: false,
});

const openModal = ({
    withDelay = false,
    enableVerticalActions = false,
    title = 'Confirmation Required',
    message = null,
    entityName = null,
    cancelBtnText = 'cancel',
    submitBtnText = 'confirm',
    messageSlot = 'message',
    action,
    onSuccess,
    onError = null,
    onClose = null,
}) => {
    config.enableVerticalActions = enableVerticalActions;
    config.title = title;
    config.message = message;
    config.entityName = entityName;
    config.cancelBtnText = cancelBtnText;
    config.submitBtnText = submitBtnText;
    config.messageSlot = messageSlot;
    config.action = action;
    config.onSuccess = onSuccess;
    config.onError = onError;
    config.onClose = onClose;

    if (withDelay) {
        startConfirmationDelay();
    }

    state.isOpened = true;
};

const closeModal = (forceClose = false) => {
    if (forceClose || !state.isSubmitting) {
        if (typeof config.onClose === 'function') {
            config.onClose();
        }

        state.isOpened = false;
        state.isSubmitting = false;

        for (const key in config) {
            config[key] = null;
        }
    }
};

const submitAction = () => {
    if (!config.action || !config.onSuccess || isConfirmationDelayed.value) return;

    state.isSubmitting = true;

    config
        .action()
        .then((data) => config.onSuccess(data))
        .catch((error) => config.onError?.(error));
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
            :enable-vertical-actions="config.enableVerticalActions"
        >
            <template #title>{{ config.title }}</template>

            <template #content>
                <p v-if="config.entityName !== null || config.message !== null">
                    <template v-if="config.entityName !== null">
                        <b>"{{ config.entityName }}"</b>

                        {{ ' ' }}
                    </template>

                    <span v-if="config.message !== null">{{ config.message }}</span>
                </p>

                <slot :name="config.messageSlot" />
            </template>

            <template #actions>
                <button
                    type="button"
                    :disabled="state.isSubmitting"
                    @click="closeModal"
                >
                    {{ config.cancelBtnText }}
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
                            {{ confirmationDelayCountdown > 0 ? confirmationDelayCountdown : config.submitBtnText }}
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
