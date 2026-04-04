import { PATH_PATTERNS } from '@router/utils/path-patterns.js';

import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.js';

import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.js';

import EmployeeCreateView from '@domains/employees/views/create/EmployeeCreateView.vue';
import EmployeeEditView from '@domains/employees/views/edit/EmployeeEditView.vue';
import EmployeesView from '@domains/employees/views/EmployeesView.vue';

export const employeesRoute = {
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
            path: `:employeeId${PATH_PATTERNS.NUMERIC}/edit`,
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
