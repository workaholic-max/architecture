<script setup lang="ts">
import { Nullable } from '@shared/types/nullable.ts';

import Modal from '@shared/components/modal/index.js';

defineProps<{
    errorMessage: Nullable<string>;
}>();

// ───────────────────────────────────────────────────────
// Modal state
// ───────────────────────────────────────────────────────

const modalTitle = navigator.onLine ? 'An unexpected error occurred' : 'No internet connection';

const reloadApp = () => window.location.reload();
</script>

<template>
    <Modal.Overlay :is-opened="!!errorMessage">
        <Modal.Dialog enable-centered-content>
            <template #title>{{ modalTitle }}</template>

            <template #content>
                {{ errorMessage }}
            </template>

            <template #actions>
                <button @click="reloadApp">Reload</button>
            </template>
        </Modal.Dialog>
    </Modal.Overlay>
</template>
