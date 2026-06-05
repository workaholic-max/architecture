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

    router.onError((error) => {
        const { message } = error;

        const isChunkLoadError =
            message.includes('Failed to fetch dynamically imported module') ||
            message.includes('Importing a module script failed');

        if (isChunkLoadError) {
            window.location.reload();
        }
    });

    app.use(router);
};
