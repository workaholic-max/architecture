const resolvedRoutesCache = new Map();

export const useResolvedRoutes = () => {
    const router = useRouter();

    const getResolvedRoute = (name) => {
        if (resolvedRoutesCache.has(name)) {
            return resolvedRoutesCache.get(name);
        }

        const { href, meta } = router.resolve({ name });

        const entry = {
            href: href,
            meta: meta ?? {},
        };

        resolvedRoutesCache.set(name, entry);

        return entry;
    };

    const getResolvedMeta = (name) => getResolvedRoute(name).meta;
    const getResolvedHref = (name) => getResolvedRoute(name).href;

    return { getResolvedMeta, getResolvedHref };
};
