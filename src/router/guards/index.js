import { isObject } from '@shared/utils/object.js';
import { authGuard } from './fragments/auth.js';
import { permissionGuard } from './fragments/permission.js';

const guards = [authGuard, permissionGuard];

// Guard results:
// null   --> continue
// true   --> accepted
// object --> redirect
export const resolveGuards = (to, employee) => {
    for (const guard of guards) {
        const result = guard({ to, employee });

        if (result === null) {
            continue;
        }

        if (result === true) {
            return;
        }

        if (isObject(result)) {
            return result;
        }
    }
};
