const DEVICE_TYPES = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
};

const DEVICE_BREAKPOINTS = {
    MOBILE_MAX: 768,
    DESKTOP_MIN: 1024,
};

let deviceType = null;
let mediaQueries = null;

const ensureInitialized = () => {
    if (mediaQueries === null) {
        throw new Error('deviceService is not initialized.');
    }
};

const updateDeviceType = () => {
    for (const [type, mediaQuery] of Object.entries(mediaQueries)) {
        if (mediaQuery.matches) {
            deviceType = type;

            break;
        }
    }
};

const initMediaQueries = () => {
    mediaQueries = {
        [DEVICE_TYPES.MOBILE]: window.matchMedia(`(max-width: ${DEVICE_BREAKPOINTS.MOBILE_MAX}px)`),
        [DEVICE_TYPES.TABLET]: window.matchMedia(
            `(min-width: ${DEVICE_BREAKPOINTS.MOBILE_MAX + 1}px) and (max-width: ${DEVICE_BREAKPOINTS.DESKTOP_MIN - 1}px)`
        ),
        [DEVICE_TYPES.DESKTOP]: window.matchMedia(`(min-width: ${DEVICE_BREAKPOINTS.DESKTOP_MIN}px)`),
    };

    Object.values(mediaQueries).forEach((mediaQuery) => {
        mediaQuery.addEventListener('change', updateDeviceType);
    });
};

const init = () => {
    initMediaQueries();
    updateDeviceType();
};

const getState = () => {
    ensureInitialized();

    return {
        isMobile: deviceType === DEVICE_TYPES.MOBILE,
        isTablet: deviceType === DEVICE_TYPES.TABLET,
        isDesktop: deviceType === DEVICE_TYPES.DESKTOP,
    };
};

export const deviceService = {
    init,
    getState,
};
