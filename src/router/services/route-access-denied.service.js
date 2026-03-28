import { notificationService } from '@shared/services/notification.service.js';

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
