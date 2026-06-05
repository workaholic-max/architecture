import type { RouteRecordRaw } from 'vue-router';

import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.ts';

export const dashboardRoute: RouteRecordRaw = {
    path: '/dashboard',
    name: DASHBOARD_ROUTE_NAME,
    component: () => import('@domains/dashboard/views/DashboardView.vue'),
    meta: { title: 'Dashboard' },
};
