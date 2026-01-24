import { initRouter } from '@router/init.js';
import { initPackages } from './fragments/packages.js';
import { initServices } from './fragments/services.js';
import { initDirectives } from './fragments/directives.js';

export const initApp = (app) => {
    initPackages(app);
    initServices();
    initDirectives(app);
    initRouter(app);
};
