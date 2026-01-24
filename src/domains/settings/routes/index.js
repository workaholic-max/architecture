import { SETTINGS_ROUTE_NAME } from './route-names.js';
import SettingsView from '../views/SettingsView.vue';

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
