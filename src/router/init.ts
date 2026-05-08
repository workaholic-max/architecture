import type { App } from 'vue';

import router from '@router';
import { resolveGuards } from '@router/guards/index.ts';

import { EMPLOYEE_MOCK_DATA } from '@domains/employees/mocks/employee.ts';

export const initRouter = (app: App) => {
    router.beforeEach((to, from) => {
        if (to.name === from.name) return;

        return resolveGuards({ to, employee: EMPLOYEE_MOCK_DATA });
    });

    app.use(router);
};
