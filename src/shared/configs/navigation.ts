import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.ts';
import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.ts';
import { PROFILE_ROUTE_NAME } from '@domains/profile/routes/route-names.ts';
import { SETTINGS_ROUTE_NAME } from '@domains/settings/routes/route-names.ts';

export const MAIN_NAVIGATION_CONFIG = [
    DASHBOARD_ROUTE_NAME,
    SETTINGS_ROUTE_NAME,
    EMPLOYEES_ROUTE_NAMES.INDEX,
    PROFILE_ROUTE_NAME,
] as const;
