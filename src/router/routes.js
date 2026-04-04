import { fallbackRoutes } from '@router/fallback/routes.js';

import { authRoutes } from '@domains/auth/routes/index.js';
import { dashboardRoute } from '@domains/dashboard/routes/index.js';
import { employeesRoute } from '@domains/employees/routes/index.js';
import { profileRoute } from '@domains/profile/routes/index.js';
import { settingsRoute } from '@domains/settings/routes/index.js';

const resolvedSettingsRoute = {
    ...settingsRoute,
    children: [...settingsRoute.children, employeesRoute, profileRoute],
};

export default [...authRoutes, dashboardRoute, resolvedSettingsRoute, ...fallbackRoutes];
