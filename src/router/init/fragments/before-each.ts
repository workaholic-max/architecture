import type { NavigationGuardWithThis, RouteLocationRaw } from 'vue-router';

import router from '@router';
import { resolveGuards } from '@router/guards/index.ts';

import { useAccountStore } from '@domains/auth/stores/account.store.ts';

import type { StoredRoute } from '@router/utils/last-visited-route.ts';
import { lastVisitedRoute } from '@router/utils/last-visited-route.ts';

export const onBeforeEach: NavigationGuardWithThis<undefined> = (to, from): RouteLocationRaw | undefined => {
    if (to.name === from.name) return;

    const accountStore = useAccountStore();

    const isRouteReachable = (route: StoredRoute): boolean => {
        if (!router.hasRoute(route.name)) return false;

        const resolvedRoute = router.resolve({
            name: route.name,
            params: route.params,
        });

        return resolveGuards({ to: resolvedRoute, employee: accountStore.account }) === undefined;
    };

    const lastVisited = lastVisitedRoute.get(to, isRouteReachable);

    if (lastVisited !== undefined) {
        return lastVisited;
    }

    return resolveGuards({ to, employee: accountStore.account });
};
