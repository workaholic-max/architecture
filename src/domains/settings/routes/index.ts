import type { RouteRecordRaw } from 'vue-router';

import { SETTINGS_ROUTE_NAME } from '@domains/settings/routes/route-names.ts';

export const settingsRoute: RouteRecordRaw = {
    path: '/settings',
    children: [
        {
            path: '',
            name: SETTINGS_ROUTE_NAME,
            component: () => import('@domains/settings/views/SettingsView.vue'),
            meta: { title: 'Settings' },
        },
    ],
};
