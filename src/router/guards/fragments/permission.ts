import { FALLBACK_ROUTE_NAMES } from '@router/fallback/route-names.ts';

import type { Guard } from '@router/types/guard.ts';

import { canAccessRoute } from '@router/utils/permission.ts';

export const permissionGuard: Guard = ({ to, employee }) => {
    if (employee === null) return null;

    const { permission } = to.meta;

    if (!canAccessRoute(employee, permission)) {
        return {
            name: FALLBACK_ROUTE_NAMES.ACCESS_DENIED,
            query: {
                deniedPath: to.path,
                deniedName: String(to.name),
            },
        };
    }

    return null;
};
