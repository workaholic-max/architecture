import type { RouteRecordRaw } from 'vue-router';

import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.ts';

import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.ts';

export const employeesRoute: RouteRecordRaw = {
    path: 'employees',
    children: [
        {
            path: '',
            name: EMPLOYEES_ROUTE_NAMES.INDEX,
            component: () => import('@domains/employees/views/EmployeesView.vue'),
            meta: {
                title: 'Employees',
                permission: {
                    key: EMPLOYEES_PERMISSION_KEYS.VIEW,
                },
            },
        },
        {
            path: 'create',
            name: EMPLOYEES_ROUTE_NAMES.CREATE,
            component: () => import('@domains/employees/views/create/EmployeeCreateView.vue'),
            meta: {
                title: 'Invite Employee',
                permission: {
                    key: EMPLOYEES_PERMISSION_KEYS.MANAGE,
                },
            },
        },

        {
            path: ':employeeId/edit',
            name: EMPLOYEES_ROUTE_NAMES.EDIT,
            component: () => import('@domains/employees/views/edit/EmployeeEditView.vue'),
            props: true,
            meta: {
                title: 'Edit Employee',
                permission: {
                    key: EMPLOYEES_PERMISSION_KEYS.MANAGE,
                },
            },
        },
    ],
};
