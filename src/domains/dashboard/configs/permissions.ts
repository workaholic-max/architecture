import { ValueOf } from '@shared/types/utility.ts';

export const DASHBOARD_PERMISSION_KEYS = {
    MANAGE: 'dashboard.manage',
} as const;

export type DashboardPermissionKey = ValueOf<typeof DASHBOARD_PERMISSION_KEYS>;
