<script setup>
import BaseLayout from '@shared/layouts/BaseLayout.vue';

import ProgressBar from '@shared/components/ProgressBar.vue';
import TaskList from './components/TaskList.vue';
</script>

<template>
    <BaseLayout>
        <TaskList />

        <ProgressBar :value="50" />
    </BaseLayout>
</template>
