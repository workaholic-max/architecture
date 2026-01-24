import { DASHBOARD_ROUTE_NAME } from './route-names.js';
import DashboardView from '../views/DashboardView.vue';

export const dashboardRoute = {
    path: '/dashboard',
    name: DASHBOARD_ROUTE_NAME,
    component: DashboardView,
    meta: { title: 'Dashboard' },
};
