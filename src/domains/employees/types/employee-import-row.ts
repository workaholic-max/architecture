import type { EmployeeRole } from '@domains/employees/enums/roles.ts';

export interface EmployeeImportRow {
    name: string;
    role: EmployeeRole;
}
