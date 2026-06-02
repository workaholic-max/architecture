import type { Employee } from '@domains/employees/types/employee.ts';

import { EMPLOYEE_ROLES, EmployeeRole } from '@domains/employees/enums/roles.ts';

const hasRole = (account: Employee, role: EmployeeRole) => account.role === role;

export const isAdmin = (account: Employee) => hasRole(account, EMPLOYEE_ROLES.ADMIN);
export const isManager = (account: Employee) => hasRole(account, EMPLOYEE_ROLES.MANAGER);
