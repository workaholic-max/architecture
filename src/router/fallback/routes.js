import { FALLBACK_ROUTE_NAMES } from './route-names.js';
import NotFoundView from './views/not-found/NotFoundView.vue';

export const fallbackRoutes = [
    {
        path: '/:pathMatch(.*)*',
        name: FALLBACK_ROUTE_NAMES.NOT_FOUND,
        component: NotFoundView,
        meta: { title: 'Page Not Found' },
    },
];
