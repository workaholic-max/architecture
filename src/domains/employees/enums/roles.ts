import { ValueOf } from '@shared/types/utility.ts';

export const EMPLOYEE_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
} as const;

export type EmployeeRole = ValueOf<typeof EMPLOYEE_ROLES>;

export const ROLE_OPTIONS = [
    { value: EMPLOYEE_ROLES.ADMIN, text: 'Admin' },
    { value: EMPLOYEE_ROLES.MANAGER, text: 'Manager' },
];
