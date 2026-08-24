<script setup lang="ts">
import { onErrorCaptured } from 'vue';

import { AppApi } from '@api/index.js';

import { Nullable } from '@shared/types/utility.ts';

import { serviceWorkerService } from '@shared/services/service-worker.service.ts';

import { env } from '@shared/configs/env.ts';

import FullScreenOverlay from '@shared/components/FullScreenOverlay.vue';
import OccurredErrorModal from './components/OccurredErrorModal.vue';
import ReloadOverlay from './components/ReloadOverlay.vue';

// ───────────────────────────────────────────────────────
// Occurred error state
// ───────────────────────────────────────────────────────

const occurredErrorMessage = ref<Nullable<string>>(null);

onErrorCaptured((error) => {
    occurredErrorMessage.value = error.message;

    return env.mode === 'local-development';
});

// ───────────────────────────────────────────────────────
// App state
// ───────────────────────────────────────────────────────

const isAppStateLoading = ref(true);

onBeforeMount(async () => {
    await serviceWorkerService.ensureActivated();

    AppApi.get()
        .then(() => {})
        .catch(() => {
            // This will realistically never resolve locally — there's no backend running to
            // answer it, so expect this to just fail every time in local development.
        })
        .finally(() => (isAppStateLoading.value = false));
});
</script>

<template>
    <div class="ml-app">
        <OccurredErrorModal :error-message="occurredErrorMessage" />

        <ReloadOverlay />

        <FullScreenOverlay v-if="isAppStateLoading" />

        <router-view v-else-if="occurredErrorMessage === null" />
    </div>
</template>
