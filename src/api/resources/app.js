import { HTTP_METHODS } from '@shared/constants/http.js';
import { apiClient } from '../client.js';

export default {
    get: () =>
        apiClient.request({
            method: HTTP_METHODS.GET,
            url: 'app-state',
            withOrg: false,
        }),
};
