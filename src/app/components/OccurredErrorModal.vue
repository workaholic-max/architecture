<script setup lang="ts">
import { Nullable } from '@shared/types/nullable.ts';

import Modal from '@shared/components/modal/index.js';

defineProps<{
    errorMessage: Nullable<string>;
}>();
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
