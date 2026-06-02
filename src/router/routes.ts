import type { RouteRecordRaw } from 'vue-router';

import { fallbackRoutes } from '@router/fallback/routes.ts';

import { authRoutes } from '@domains/auth/routes/index.ts';
import { dashboardRoute } from '@domains/dashboard/routes/index.ts';
import { employeesRoute } from '@domains/employees/routes/index.ts';
import { profileRoute } from '@domains/profile/routes/index.ts';
import { settingsRoute } from '@domains/settings/routes/index.ts';

const resolvedSettingsRoute: RouteRecordRaw = {
    ...settingsRoute,
    children: [...(settingsRoute.children ?? []), employeesRoute, profileRoute],
};

const routes: RouteRecordRaw[] = [...authRoutes, dashboardRoute, resolvedSettingsRoute, ...fallbackRoutes];

export default routes;
