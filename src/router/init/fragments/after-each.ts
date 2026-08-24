import type { RouteLocationNormalized } from 'vue-router';

import { lastVisitedRoute } from '@router/utils/last-visited-route.ts';

export const onAfterEach = (to: RouteLocationNormalized): void => {
    lastVisitedRoute.set(to);
};
