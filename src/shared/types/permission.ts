import type { DashboardPermissionKey } from '@domains/dashboard/configs/permissions.ts';
import type { EmployeePermissionKey } from '@domains/employees/configs/permissions.ts';

export type PermissionKey = DashboardPermissionKey | EmployeePermissionKey;
