import type { Employee } from '@domains/employees/types/employee.ts';

import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.ts';

import { EMPLOYEE_ROLES } from '@domains/employees/constants/roles.ts';

export const EMPLOYEE_MOCK_DATA: Employee = {
    id: 'uuid',
    name: 'Mamskym Lukian',
    created_at: '2002-04-30T22:20:00.000Z',
    role: EMPLOYEE_ROLES.MANAGER,
    permissions: {
        [EMPLOYEES_PERMISSION_KEYS.VIEW]: true,
    },
};
