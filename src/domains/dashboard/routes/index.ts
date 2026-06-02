import type { RouteRecordRaw } from 'vue-router';

import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.ts';

import DashboardView from '@domains/dashboard/views/DashboardView.vue';

export const dashboardRoute: RouteRecordRaw = {
    path: '/dashboard',
    name: DASHBOARD_ROUTE_NAME,
    component: DashboardView,
    meta: { title: 'Dashboard' },
};
