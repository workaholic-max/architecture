import { PermissionKey } from '@shared/types/permission.ts';

import type { EmployeeRole } from '@domains/employees/enums/roles.ts';

export interface Employee {
    id: string;
    name: string;
    created_at: string;
    avatar_url?: string;
    role: EmployeeRole;
    permissions: Partial<Record<PermissionKey, boolean>>;
}
