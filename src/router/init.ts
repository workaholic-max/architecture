import type { App } from 'vue';

import router from '@router';
import { resolveGuards } from '@router/guards/index.ts';

import { useAccountStore } from '@domains/auth/stores/account.store.ts';

export const initRouter = (app: App) => {
    router.beforeEach((to, from) => {
        if (to.name === from.name) return;

        const accountStore = useAccountStore();

        return resolveGuards({ to, employee: accountStore.account });
    });

    app.use(router);
};
