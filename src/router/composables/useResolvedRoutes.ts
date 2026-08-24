import type { RouteMeta } from 'vue-router';

import { Nullable } from '@shared/types/utility.ts';

// ───────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────

interface ResolvedRouteEntry {
    href: Nullable<string>;
    meta: RouteMeta;
}

// ───────────────────────────────────────────────────────
// Implementation
// ───────────────────────────────────────────────────────

const resolvedRoutesCache = new Map<string, ResolvedRouteEntry>();

export const useResolvedRoutes = () => {
    const router = useRouter();

    const getResolvedRoute = (name: string, path?: string): ResolvedRouteEntry => {
        const cachedRoute = resolvedRoutesCache.get(name);

        if (cachedRoute !== undefined) {
            return cachedRoute;
        }

        let entry: ResolvedRouteEntry;

        try {
            const resolvedRoute = router.resolve(typeof path === 'string' ? { path } : { name });

            entry = {
                href: resolvedRoute.href,
                meta: resolvedRoute.meta ?? {},
            };
        } catch {
            entry = {
                href: null,
                meta: {
                    title: path ?? 'Page',
                },
            };
        }

        resolvedRoutesCache.set(name, entry);

        return entry;
    };

    const getResolvedMeta = (name: string, path?: string) => getResolvedRoute(name, path).meta;
    const getResolvedHref = (name: string, path?: string) => getResolvedRoute(name, path).href;

    return { getResolvedMeta, getResolvedHref };
};
