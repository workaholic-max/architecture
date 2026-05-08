import type { App } from 'vue';

import { initRouter } from '@router/init.ts';

import { initPackages } from './fragments/packages.js';
import { initServices } from './fragments/services.js';

export const initApp = (app: App) => {
    initRouter(app);
    initPackages();
    initServices();
};
