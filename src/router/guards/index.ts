import type { Guard, GuardContext } from '@router/types/guard.ts';

import { authGuard } from './fragments/auth.ts';
import { permissionGuard } from './fragments/permission.ts';

const guards: Guard[] = [authGuard, permissionGuard];

// Guard results:
// null   --> continue
// true   --> accepted
// object --> redirect
export const resolveGuards = (guardContext: GuardContext) => {
    for (const guard of guards) {
        const result = guard(guardContext);

        if (result === null) {
            continue;
        }

        if (result === true) {
            return;
        }

        return result;
    }
};
