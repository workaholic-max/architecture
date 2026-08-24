<script setup lang="ts">
import { Nullable } from '@shared/types/utility.ts';

import Modal from '@shared/components/modal/index.js';

defineProps<{
    errorMessage: Nullable<string>;
}>();

// ───────────────────────────────────────────────────────
// Modal state
// ───────────────────────────────────────────────────────

const isOnline = navigator.onLine;
const modalTitle = isOnline ? 'An unexpected error occurred' : 'No internet connection';

const reloadApp = () => window.location.reload();
</script>

<template>
    <Modal.Overlay :is-opened="!!errorMessage">
        <Modal.Dialog enable-centered-content>
            <template #title>{{ modalTitle }}</template>

            <template
                v-if="isOnline"
                #content
            >
                {{ errorMessage }}
            </template>

            <template #actions>
                <button @click="reloadApp">Reload</button>
            </template>
        </Modal.Dialog>
    </Modal.Overlay>
</template>
