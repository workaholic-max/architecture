import clickOutside from '@shared/directives/click-outside.js';

export const initDirectives = (app) => {
    app.directive('click-outside', clickOutside);
};
