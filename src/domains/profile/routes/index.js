import { PROFILE_ROUTE_NAME } from '@domains/profile/routes/route-names.js';

import ProfileView from '@domains/profile/views/ProfileView.vue';

export const profileRoute = {
    path: 'profile',
    name: PROFILE_ROUTE_NAME,
    component: ProfileView,
    meta: { title: 'Profile' },
};
