import axios from 'axios';

export const useAbortableRequest = () => {
    const requests = new Map();

    const generateId = () => window.crypto.randomUUID();

    const sendAbortableRequest = (request) => {
        const requestId = generateId();

        requests.set(requestId, request);

        return request
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return null;
                }

                return Promise.reject(error);
            })
            .finally(() => requests.delete(requestId));
    };

    const abortRequests = () => {
        requests.forEach((request) => request.abort?.());

        requests.clear();
    };

    onBeforeUnmount(abortRequests);

    return { sendAbortableRequest, abortRequests };
};
