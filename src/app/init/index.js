import { initRouter } from '@router/init.js';

import { initDirectives } from './fragments/directives.js';
import { initPackages } from './fragments/packages.js';
import { initServices } from './fragments/services.js';

export const initApp = (app) => {
    initPackages(app);
    initServices();
    initDirectives(app);
    initRouter(app);
};
