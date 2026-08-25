import type { NotificationType } from '@features/notifications/enums/notification.ts';

export interface Notification {
    id: number;
    message: string;
    type: NotificationType;
}

export type CreateNotification = Omit<Notification, 'id'>;
