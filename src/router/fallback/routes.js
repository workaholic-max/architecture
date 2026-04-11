import { FALLBACK_ROUTE_NAMES } from '@router/fallback/route-names.js';
import AccessDeniedView from '@router/fallback/views/access-denied/AccessDeniedView.vue';
import NotFoundView from '@router/fallback/views/not-found/NotFoundView.vue';

export const fallbackRoutes = [
    {
        path: '/access-denied',
        name: FALLBACK_ROUTE_NAMES.ACCESS_DENIED,
        component: AccessDeniedView,
        meta: { title: 'Access Denied' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: FALLBACK_ROUTE_NAMES.NOT_FOUND,
        component: NotFoundView,
        meta: { title: 'Page Not Found' },
    },
];
