const ensureActivated = () =>
    new Promise<void>((resolve) => {
        const { serviceWorker } = navigator;

        if (!serviceWorker?.controller) {
            resolve();

            return;
        }

        let isResolved = false;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const cleanup = () => {
            serviceWorker.removeEventListener('controllerchange', handleControllerChange);

            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };

        const resolveOnce = () => {
            if (isResolved) return;

            isResolved = true;

            cleanup();
            resolve();
        };

        const handleControllerChange = () => {
            if (isResolved) return;

            isResolved = true;

            window.location.reload();
        };

        const updateRegistration = async () => {
            serviceWorker.addEventListener('controllerchange', handleControllerChange);

            const registration = await serviceWorker.getRegistration();

            if (!registration) {
                resolveOnce();

                return;
            }

            timeoutId = setTimeout(resolveOnce, 7000); // 7s

            try {
                await registration.update();
            } catch {
                // Update checks are best-effort. Startup should continue if the browser rejects it.
            }

            if (registration.waiting === null && registration.installing === null) {
                resolveOnce();
            }
        };

        updateRegistration().catch(resolveOnce);
    });

export const serviceWorkerService = {
    ensureActivated,
};
