export const EMPLOYEES_PERMISSION_KEYS = {
    VIEW: 'employees.view',
    MANAGE: 'employees.manage',
} as const;

export type EmployeePermissionKey = (typeof EMPLOYEES_PERMISSION_KEYS)[keyof typeof EMPLOYEES_PERMISSION_KEYS];
