import type { Guard } from '@router/types/guard.ts';

import { AUTH_ROUTE_NAMES } from '@domains/auth/routes/route-names.js';
import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.js';

export const authGuard: Guard = ({ to, employee }) => {
    if (to.name === AUTH_ROUTE_NAMES.JOIN) {
        return true;
    }

    if (employee === null) {
        if (to.name !== AUTH_ROUTE_NAMES.LOGIN) {
            return {
                name: AUTH_ROUTE_NAMES.LOGIN,
                query: { from: window.location.href },
            };
        }

        return true;
    }

    if (to.name === AUTH_ROUTE_NAMES.LOGIN) {
        return { name: DASHBOARD_ROUTE_NAME };
    }

    return null;
};
