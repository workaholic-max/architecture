import { notificationService } from '@shared/services/notification.js';

let pendingPageLabel = null;

export const routeAccessDeniedService = {
    report: (pageLabel) => {
        pendingPageLabel = pageLabel;
    },

    notify: () => {
        if (!pendingPageLabel) return;

        notificationService.notify(`${pendingPageLabel} access denied`);

        pendingPageLabel = null;
    },
};
