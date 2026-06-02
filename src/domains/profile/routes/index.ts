import type { RouteRecordRaw } from 'vue-router';

import { PROFILE_ROUTE_NAME } from '@domains/profile/routes/route-names.ts';

import ProfileView from '@domains/profile/views/ProfileView.vue';

export const profileRoute: RouteRecordRaw = {
    path: 'profile',
    name: PROFILE_ROUTE_NAME,
    component: ProfileView,
    meta: { title: 'Profile' },
};
