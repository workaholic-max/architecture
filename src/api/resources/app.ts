import { apiClient } from '@api/client.ts';

export default {
    get: () =>
        apiClient.request<{ countries: string[] }>({
            method: 'get',
            url: 'app-state',
        }),
};
