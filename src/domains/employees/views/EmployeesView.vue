<script setup>
import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.js';

import BaseLayout from '@shared/layouts/BaseLayout.vue';
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
