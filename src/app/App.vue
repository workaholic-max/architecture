<script setup lang="ts">
import { onErrorCaptured } from 'vue';

import { Nullable } from '@shared/types/nullable.ts';

import { env } from '@shared/configs/env.ts';

import OccurredErrorModal from './components/OccurredErrorModal.vue';

// ───────────────────────────────────────────────────────
// Occurred error state
// ───────────────────────────────────────────────────────

const occurredErrorMessage = ref<Nullable<string>>(null);

onErrorCaptured((error) => {
    occurredErrorMessage.value = error.message;

    return env.mode === 'local-development';
});
</script>

<template>
    <div class="ml-app">
        <OccurredErrorModal :error-message="occurredErrorMessage" />

        <router-view v-if="occurredErrorMessage === null" />
    </div>
</template>
