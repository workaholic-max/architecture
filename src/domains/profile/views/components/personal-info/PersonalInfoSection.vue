<script setup>
import CriminalDetails from './components/CriminalDetails.vue';
import FamilyDetails from './components/FamilyDetails.vue';
import InjuriesDetails from './components/InjuriesDetails.vue';
</script>

<template>
    <section>
        <h2>Personal Info</h2>

        <FamilyDetails />
        <CriminalDetails />
        <InjuriesDetails />
    </section>
</template>
