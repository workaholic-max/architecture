import router from '@router';
import { resolveGuards } from '@router/guards/index.js';
import { routeAccessDeniedService } from '@router/services/route-access-denied.service.js';

import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.js';

import { EMPLOYEE_ROLES } from '@domains/employees/constants/roles.js';

const EMPLOYEE_MOCK_DATA = {
    role: EMPLOYEE_ROLES.MANAGER,
    permissions: {
        [EMPLOYEES_PERMISSION_KEYS.VIEW]: true,
        [EMPLOYEES_PERMISSION_KEYS.MANAGE]: true,
    },
};

export const initRouter = (app) => {
    router.beforeEach((to, from) => {
        if (to.name === from.name) return;

        return resolveGuards(to, EMPLOYEE_MOCK_DATA);
    });

    router.afterEach(() => {
        routeAccessDeniedService.notify();
    });

    app.use(router);
};
