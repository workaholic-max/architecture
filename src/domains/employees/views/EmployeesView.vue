<script setup lang="ts">
import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.ts';

import BaseLayout from '@shared/layouts/BaseLayout.vue';
</script>

<template>
    <BaseLayout>
        <router-link :to="{ name: EMPLOYEES_ROUTE_NAMES.CREATE }">Create Employee</router-link>

        <router-link
            :to="{
                name: EMPLOYEES_ROUTE_NAMES.EDIT,
                params: { employeeId: 'uuid' },
            }"
        >
            Edit Employee
        </router-link>
    </BaseLayout>
</template>
