export const EMPLOYEE_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
};

export const ROLE_OPTIONS = [
    { value: EMPLOYEE_ROLES.ADMIN, text: 'Admin' },
    { value: EMPLOYEE_ROLES.MANAGER, text: 'Manager' },
];

export type EmployeeRole = (typeof EMPLOYEE_ROLES)[keyof typeof EMPLOYEE_ROLES];
