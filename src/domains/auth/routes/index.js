import { AUTH_ROUTE_NAMES } from './route-names.js';
import LoginView from '../views/login/LoginView.vue';
import JoinView from '../views/join/JoinView.vue';

export const authRoutes = [
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
