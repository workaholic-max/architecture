import { EMPLOYEE_ROLES, EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/public.js';
import router from './index.js';
import { resolveGuards } from './guards/index.js';
import { routeAccessDeniedService } from './services/route-access-denied.js';

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
