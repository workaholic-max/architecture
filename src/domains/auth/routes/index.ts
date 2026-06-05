import type { RouteRecordRaw } from 'vue-router';

import { AUTH_ROUTE_NAMES } from '@domains/auth/routes/route-names.ts';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: AUTH_ROUTE_NAMES.LOGIN,
        component: () => import('@domains/auth/views/login/LoginView.vue'),
        meta: { title: 'Login' },
    },

    {
        path: '/join',
        name: AUTH_ROUTE_NAMES.JOIN,
        component: () => import('@domains/auth/views/join/JoinView.vue'),
        meta: { title: 'Join' },
    },
];
