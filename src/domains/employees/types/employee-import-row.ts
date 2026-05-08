import type { EmployeeRole } from '@domains/employees/constants/roles.ts';

export interface EmployeeImportRow {
    name: string;
    role: EmployeeRole;
}
