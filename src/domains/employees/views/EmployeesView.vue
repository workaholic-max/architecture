<script setup>
import BaseLayout from '@shared/layouts/BaseLayout.vue';
import { EMPLOYEES_ROUTE_NAMES } from '../routes/route-names.js';
</script>

<template>
    <BaseLayout>
        <router-link :to="{ name: EMPLOYEES_ROUTE_NAMES.CREATE }">Create Employee</router-link>

        <router-link
            :to="{
                name: EMPLOYEES_ROUTE_NAMES.EDIT,
                params: { employeeId: 7 },
            }"
        >
            Edit Employee
        </router-link>
    </BaseLayout>
</template>
