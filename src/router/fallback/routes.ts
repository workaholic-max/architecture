import type { RouteRecordRaw } from 'vue-router';

import { FALLBACK_ROUTE_NAMES } from '@router/fallback/route-names.ts';
import AccessDeniedView from '@router/fallback/views/access-denied/AccessDeniedView.vue';
import NotFoundView from '@router/fallback/views/not-found/NotFoundView.vue';

export const fallbackRoutes: RouteRecordRaw[] = [
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
