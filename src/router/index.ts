import { createRouter, createWebHistory } from 'vue-router';

import routes from '@router/routes.ts';

import { env } from '@shared/configs/env.ts';

const router = createRouter({
    history: createWebHistory(env.baseUrl),
    routes,
});

export default router;
