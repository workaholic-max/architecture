import { DASHBOARD_ROUTE_NAME } from '@domains/dashboard/routes/route-names.js';
import { SETTINGS_ROUTE_NAME } from '@domains/settings/routes/route-names.js';
import { EMPLOYEES_ROUTE_NAMES } from '@domains/employees/routes/route-names.js';
import { PROFILE_ROUTE_NAME } from '@domains/profile/routes/route-names.js';

export const MAIN_NAVIGATION_CONFIG = [
    DASHBOARD_ROUTE_NAME,
    SETTINGS_ROUTE_NAME,
    EMPLOYEES_ROUTE_NAMES.INDEX,
    PROFILE_ROUTE_NAME,
];
