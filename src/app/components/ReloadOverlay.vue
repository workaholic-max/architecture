<script setup lang="ts">
import { useAppReloadStore } from '@shared/stores/app-reload.store.ts';

import FullScreenOverlay from '@shared/components/FullScreenOverlay.vue';

const appReloadStore = useAppReloadStore();
</script>

<template>
    <FullScreenOverlay v-if="appReloadStore.isOverlayVisible" />
</template>
