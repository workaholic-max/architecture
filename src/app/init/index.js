import { initRouter } from '@router/init.js';

import { initPackages } from './fragments/packages.js';
import { initServices } from './fragments/services.js';

export const initApp = (app) => {
    initRouter(app);
    initPackages();
    initServices();
};
