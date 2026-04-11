const resolvedRoutesCache = new Map();

export const useResolvedRoutes = () => {
    const router = useRouter();

    const getResolvedRoute = (name, path = null) => {
        if (resolvedRoutesCache.has(name)) {
            return resolvedRoutesCache.get(name);
        }

        let entry;

        try {
            const resolvedRoute = router.resolve(path !== null ? { path } : { name });

            entry = {
                href: resolvedRoute.href,
                meta: resolvedRoute.meta ?? {},
            };
        } catch {
            entry = {
                href: null,
                meta: {},
            };
        }

        resolvedRoutesCache.set(name, entry);

        return entry;
    };

    const getResolvedMeta = (name, path = null) => getResolvedRoute(name, path).meta;
    const getResolvedHref = (name, path = null) => getResolvedRoute(name, path).href;

    return { getResolvedMeta, getResolvedHref };
};
