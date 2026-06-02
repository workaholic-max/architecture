import type { RouteRecordRaw } from 'vue-router';

import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.ts';

import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.ts';

import EmployeeCreateView from '@domains/employees/views/create/EmployeeCreateView.vue';
import EmployeeEditView from '@domains/employees/views/edit/EmployeeEditView.vue';
import EmployeesView from '@domains/employees/views/EmployeesView.vue';

export const employeesRoute: RouteRecordRaw = {
    path: 'employees',
    children: [
        {
            path: '',
            name: EMPLOYEES_ROUTE_NAMES.INDEX,
            component: EmployeesView,
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
            component: EmployeeCreateView,
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
            component: EmployeeEditView,
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
