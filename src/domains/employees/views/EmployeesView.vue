<script setup>
import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.js';

import BaseLayout from '@shared/layouts/BaseLayout.vue';
</script>

<template>
    <BaseLayout>
        <RouterLink :to="{ name: EMPLOYEES_ROUTE_NAMES.CREATE }">Create Employee</RouterLink>

        <RouterLink
            :to="{
                name: EMPLOYEES_ROUTE_NAMES.EDIT,
                params: { employeeId: 7 },
            }"
        >
            Edit Employee
        </RouterLink>
    </BaseLayout>
</template>
