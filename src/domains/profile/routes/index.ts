import type { RouteRecordRaw } from 'vue-router';

import { PROFILE_ROUTE_NAME } from '@domains/profile/routes/route-names.ts';

export const profileRoute: RouteRecordRaw = {
    path: 'profile',
    name: PROFILE_ROUTE_NAME,
    component: () => import('@domains/profile/views/ProfileView.vue'),
    meta: { title: 'Profile' },
};
