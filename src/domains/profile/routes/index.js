import { PROFILE_ROUTE_NAME } from './route-names.js';
import ProfileView from '../views/ProfileView.vue';

export const profileRoute = {
    path: 'profile',
    name: PROFILE_ROUTE_NAME,
    component: ProfileView,
    meta: { title: 'Profile' },
};
