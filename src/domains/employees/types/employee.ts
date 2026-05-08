import { PermissionKey } from '@app/types/permission.ts';

import type { EmployeeRole } from '@domains/employees/constants/roles.ts';

export interface Employee {
    id: string;
    name: string;
    created_at: string;
    avatar_url?: string;
    role: EmployeeRole;
    permissions: Partial<Record<PermissionKey, boolean>>;
}
