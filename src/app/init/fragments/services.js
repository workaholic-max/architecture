const serviceModules = import.meta.glob(['/src/**/*.service.js', '/src/**/*.service.ts'], { eager: true });

export const initServices = () => {
    Object.values(serviceModules ?? {}).forEach((module) => {
        Object.values(module).forEach((service) => {
            if (typeof service?.init === 'function') {
                service.init();
            }
        });
    });
};
