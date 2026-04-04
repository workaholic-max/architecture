import { EMPLOYEE_ROLES } from '@domains/employees/constants/roles.js';

const hasRole = (employee, role) => employee.role === role;

export const isAdmin = (account) => hasRole(account, EMPLOYEE_ROLES.ADMIN);
export const isManager = (account) => hasRole(account, EMPLOYEE_ROLES.MANAGER);
