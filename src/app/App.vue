<script setup>
import { onErrorCaptured } from 'vue';

import OccurredErrorModal from './components/OccurredErrorModal.vue';

// ───────────────────────────────────────────────────────
// Occurred error state
// ───────────────────────────────────────────────────────

const occurredErrorMessage = ref(null);

onErrorCaptured((error) => {
    occurredErrorMessage.value = error?.message || 'Something went wrong...';

    return import.meta.env.MODE === 'local-development';
});
</script>

<template>
    <div class="ml-app">
        <OccurredErrorModal :error-message="occurredErrorMessage" />

        <router-view v-if="occurredErrorMessage === null" />
    </div>
</template>
