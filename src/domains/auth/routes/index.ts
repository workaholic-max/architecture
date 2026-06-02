import type { RouteRecordRaw } from 'vue-router';

import { AUTH_ROUTE_NAMES } from '@domains/auth/routes/route-names.ts';

import JoinView from '@domains/auth/views/join/JoinView.vue';
import LoginView from '@domains/auth/views/login/LoginView.vue';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: AUTH_ROUTE_NAMES.LOGIN,
        component: LoginView,
        meta: { title: 'Login' },
    },

    {
        path: '/join',
        name: AUTH_ROUTE_NAMES.JOIN,
        component: JoinView,
        meta: { title: 'Join' },
    },
];
