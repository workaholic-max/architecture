<script setup>
import { useResolvedRoutes } from '@router/composables/useResolvedRoutes.js';

import BaseLayout from '@shared/layouts/BaseLayout.vue';

const route = useRoute();

const { getResolvedMeta } = useResolvedRoutes();

// ───────────────────────────────────────────────────────
// Access denied state
// ───────────────────────────────────────────────────────

const deniedRoute = computed(() => {
    const { deniedPath, deniedName } = route.query;

    if (!deniedPath || !deniedName) {
        return null;
    }

    return {
        path: deniedPath,
        name: deniedName,
    };
});

const accessDeniedMessage = computed(() => {
    const baseMessage = 'You do not have access';

    if (deniedRoute.value === null) {
        return baseMessage;
    }

    const { name, path } = deniedRoute.value;

    const { title } = getResolvedMeta(name, path);

    return `${baseMessage} to "${title || path}"`;
});
</script>

<template>
    <BaseLayout>{{ accessDeniedMessage }}</BaseLayout>
</template>
