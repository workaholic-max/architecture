import { SETTINGS_ROUTE_NAME } from '@domains/settings/routes/route-names.js';

import SettingsView from '@domains/settings/views/SettingsView.vue';

export const settingsRoute = {
    path: '/settings',
    children: [
        {
            path: '',
            name: SETTINGS_ROUTE_NAME,
            component: SettingsView,
            meta: { title: 'Settings' },
        },
    ],
};
