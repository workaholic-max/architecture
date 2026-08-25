import { defineStore } from 'pinia';

import type { CreateNotification, Notification } from '@features/notifications/types/notification.ts';

export const useNotificationsStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);

    let lastNotificationId = 0;

    const add = (notification: CreateNotification): Notification => {
        const resolvedNotification = {
            ...notification,
            id: ++lastNotificationId,
        };

        notifications.value.push(resolvedNotification);

        return resolvedNotification;
    };

    const remove = (notificationId: number) => {
        notifications.value = notifications.value.filter(({ id }) => id !== notificationId);
    };

    const clear = () => {
        notifications.value = [];
    };

    return {
        notifications,
        add,
        remove,
        clear,
    };
});
