import { defineStore } from 'pinia';

import { Nullable } from '@shared/types/utility.ts';

import { DEVICE_TYPES, DeviceType } from '@shared/enums/device.ts';

export const useDeviceTypeStore = defineStore('deviceType', () => {
    const deviceType = ref<Nullable<DeviceType>>(null);

    const isMobile = computed(() => deviceType.value === DEVICE_TYPES.MOBILE);
    const isTablet = computed(() => deviceType.value === DEVICE_TYPES.TABLET);
    const isDesktop = computed(() => deviceType.value === DEVICE_TYPES.DESKTOP);

    const set = (value: DeviceType) => {
        deviceType.value = value;
    };

    return {
        isMobile,
        isTablet,
        isDesktop,
        set,
    };
});
