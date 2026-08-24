import type { RouteLocationRaw } from 'vue-router';

import type { Guard, GuardContext } from '@router/types/guard.ts';

import { authGuard } from './fragments/auth.ts';
import { permissionGuard } from './fragments/permission.ts';

// Order matters: auth first, so permissionGuard can assume an authenticated employee.
const guards: Guard[] = [authGuard, permissionGuard];

// Guard results:
// null   --> continue checking the rest
// true   --> accepted, stop checking
// object --> redirect
export const resolveGuards = (guardContext: GuardContext): RouteLocationRaw | undefined => {
    for (const guard of guards) {
        const result = guard(guardContext);

        if (result === null) continue;

        if (result === true) return;

        return result;
    }
};
