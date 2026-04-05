<script setup>
import Modal from '@shared/components/modal/index.js';

defineOptions({
    inheritAttrs: false,
});

// ───────────────────────────────────────────────────────
// Confirmation modal state
// ───────────────────────────────────────────────────────

const config = {
    entity: null,
    title: null,
    cancelBtnText: null,
    submitBtnText: null,
    messageSlot: null,
    enableVerticalActions: null,
    action: null,
    onSuccess: null,
    onClose: null,
};

const state = reactive({
    isOpened: false,
    isSubmitting: false,
});

const openModal = ({
    entity = null,
    title = 'Action Required',
    cancelBtnText = 'cancel',
    submitBtnText = 'delete',
    messageSlot = 'message',
    enableVerticalActions = false,
    action,
    onSuccess,
    onClose = null,
}) => {
    config.entity = entity;
    config.title = title;
    config.cancelBtnText = cancelBtnText;
    config.submitBtnText = submitBtnText;
    config.messageSlot = messageSlot;
    config.enableVerticalActions = enableVerticalActions;
    config.action = action;
    config.onSuccess = onSuccess;
    config.onClose = onClose;

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
    if (!config.action || !config.onSuccess) return;

    state.isSubmitting = true;

    config.action().then((data) => config.onSuccess(data));
};

defineExpose({
    open: openModal,
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
                <slot
                    :name="config.messageSlot"
                    :entity="config.entity"
                />
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
                    :disabled="state.isSubmitting"
                    @click="submitAction"
                >
                    {{ config.submitBtnText }}
                </button>
            </template>
        </Modal.Dialog>
    </Modal.Overlay>
</template>

<style lang="scss">
@use '@css-vars' as vars;

.ml-confirmation-modal-dialog.ml-modal-dialog {
    > h5 + .ml-modal-dialog__wrapper {
        margin-top: vars.$space-base * -1;
    }

    .ml-modal-dialog__content {
        font-weight: vars.$font-weight-light;

        > p {
            margin-bottom: vars.$space-md;
        }
    }
}
</style>
