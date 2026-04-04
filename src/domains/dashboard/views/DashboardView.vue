<script setup>
import BaseLayout from '@shared/layouts/BaseLayout.vue';

import Progress from '@shared/components/Progress.vue';
import TaskList from './components/TaskList.vue';
</script>

<template>
    <BaseLayout>
        <TaskList />

        <Progress :value="50" />
    </BaseLayout>
</template>
