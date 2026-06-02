const notify = (text: string): void => {
    alert(`Mock notification: ${text}`);
};

export const notificationService = {
    notify,
};
