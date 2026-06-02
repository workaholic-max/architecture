import { apiClient } from '@api/client.ts';

import { HTTP_METHODS } from '@shared/enums/http.ts';

export default {
    get: () =>
        apiClient.request<{ countries: string[] }>({
            method: HTTP_METHODS.GET,
            url: 'app-state',
        }),
};
