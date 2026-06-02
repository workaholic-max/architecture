export const EMPLOYEE_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
} as const;

export type EmployeeRole = (typeof EMPLOYEE_ROLES)[keyof typeof EMPLOYEE_ROLES];

export const ROLE_OPTIONS = [
    { value: EMPLOYEE_ROLES.ADMIN, text: 'Admin' },
    { value: EMPLOYEE_ROLES.MANAGER, text: 'Manager' },
];
