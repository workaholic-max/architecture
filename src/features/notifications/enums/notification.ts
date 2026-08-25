import { ValueOf } from '@shared/types/utility.ts';

export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
} as const;

export type NotificationType = ValueOf<typeof NOTIFICATION_TYPES>;
