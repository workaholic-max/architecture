import { HTTP_METHODS } from '@shared/constants/http.js';
import { apiClient } from '../client.js';

export default {
    login: (data) =>
        apiClient.request({
            method: HTTP_METHODS.POST,
            url: 'auth/login',
            data,
        }),

    logout: () =>
        apiClient.request({
            method: HTTP_METHODS.POST,
            url: 'auth/logout',
        }),
};
