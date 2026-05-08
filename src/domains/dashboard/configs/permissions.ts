export const DASHBOARD_PERMISSION_KEYS = {
    MANAGE: 'dashboard.manage',
} as const;

export type DashboardPermissionKey = (typeof DASHBOARD_PERMISSION_KEYS)[keyof typeof DASHBOARD_PERMISSION_KEYS];
