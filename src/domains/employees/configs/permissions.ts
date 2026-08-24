import { ValueOf } from '@shared/types/utility.ts';

export const EMPLOYEES_PERMISSION_KEYS = {
    VIEW: 'employees.view',
    MANAGE: 'employees.manage',
} as const;

export type EmployeePermissionKey = ValueOf<typeof EMPLOYEES_PERMISSION_KEYS>;
