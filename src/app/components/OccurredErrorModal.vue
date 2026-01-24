<script setup>
import Modal from '@shared/components/modal/index.js';

defineProps({
    errorMessage: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <Modal.Overlay :is-opened="!!errorMessage">
        <Modal.Dialog enable-centered-content>
            <template #title>An unexpected error occurred</template>

            <template #content>
                {{ errorMessage }}
            </template>
        </Modal.Dialog>
    </Modal.Overlay>
</template>
