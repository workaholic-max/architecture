import type { EmployeeRole } from '@domains/employees/enums/roles.ts';

export interface EmployeeForm {
    name: string;
    role: EmployeeRole;
}
