import { FALLBACK_ROUTE_NAMES } from '@router/fallback/route-names.js';
import { canAccessRoute } from '@router/utils/permission.js';

export const permissionGuard = ({ to, employee }) => {
    const { permission } = to.meta ?? {};

    if (!canAccessRoute(employee, permission)) {
        return {
            name: FALLBACK_ROUTE_NAMES.ACCESS_DENIED,
            query: {
                deniedPath: to.path,
                deniedName: to.name,
            },
        };
    }

    return null;
};
