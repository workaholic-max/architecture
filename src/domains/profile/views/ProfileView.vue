<script setup>
import BaseLayout from '@shared/layouts/BaseLayout.vue';
import PersonalInfoSection from './components/personal-info/PersonalInfoSection.vue';
import WorkInfoSection from './components/WorkInfoSection.vue';
import AnotherSection from './components/AnotherSection.vue';
</script>

<template>
    <BaseLayout>
        <PersonalInfoSection />
        <WorkInfoSection />
        <AnotherSection />
    </BaseLayout>
</template>
