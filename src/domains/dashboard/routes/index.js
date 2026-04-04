import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.js';

import DashboardView from '@domains/dashboard/views/DashboardView.vue';

export const dashboardRoute = {
    path: '/dashboard',
    name: DASHBOARD_ROUTE_NAME,
    component: DashboardView,
    meta: { title: 'Dashboard' },
};
