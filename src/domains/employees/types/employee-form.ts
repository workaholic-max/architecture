import type { EmployeeRole } from '@domains/employees/constants/roles.ts';

export interface EmployeeForm {
    name: string;
    role: EmployeeRole;
}
