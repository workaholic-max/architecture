import type { RouteLocationNormalized } from 'vue-router';

import { localStorageService } from '@shared/services/local-storage.service.ts';

export interface StoredRoute {
    name: string;
    params: Record<string, string>;
}

const STORAGE_KEY = 'router.lastVisited';

let isFirstNavigation = true;

const get = (
    to: RouteLocationNormalized,
    isRouteReachable: (route: StoredRoute) => boolean
): StoredRoute | undefined => {
    if (!isFirstNavigation) return;

    isFirstNavigation = false;

    if (to.path !== '/') return;

    const lastVisited = localStorageService.get<StoredRoute>(STORAGE_KEY);

    if (lastVisited === null) return;

    if (!isRouteReachable(lastVisited)) {
        localStorageService.remove(STORAGE_KEY);

        return;
    }

    return lastVisited;
};

const set = (route: RouteLocationNormalized): void => {
    if (route.meta.ignoreLastVisited) return;
    if (route.name === undefined || route.name === null) return;

    localStorageService.set<StoredRoute>(STORAGE_KEY, {
        name: String(route.name),
        params: route.params as Record<string, string>,
    });
};

export const lastVisitedRoute = {
    get,
    set,
};
