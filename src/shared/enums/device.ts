import { ValueOf } from '@shared/types/utility.ts';

export const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
} as const;

export type DeviceType = ValueOf<typeof DEVICE_TYPES>;
