import { HTTP_METHODS, HTTP_RESPONSE_TYPES } from '@shared/constants/http.js';

import { apiClient } from '../client.js';

export default {
    getAll: (params = {}) =>
        apiClient.request({
            method: HTTP_METHODS.GET,
            url: 'employees',
            params,
        }),

    getById: (employeeId) =>
        apiClient.request({
            method: HTTP_METHODS.GET,
            url: `employees/${employeeId}`,
        }),

    create: (data, params = {}) =>
        apiClient.request({
            method: HTTP_METHODS.POST,
            url: 'employees',
            data,
            params,
        }),

    update: (employeeId, data) =>
        apiClient.request({
            method: HTTP_METHODS.PUT,
            url: `employees/${employeeId}`,
            data,
        }),

    delete: (employeeId, params = {}) =>
        apiClient.request({
            method: HTTP_METHODS.DELETE,
            url: `employees/${employeeId}`,
            params,
        }),

    getProfile: (employeeId) =>
        apiClient.request({
            method: HTTP_METHODS.GET,
            url: `employees/${employeeId}/profile`,
        }),

    avatar: {
        upload: (employeeId, data) =>
            apiClient.request({
                method: HTTP_METHODS.POST,
                url: `employees/${employeeId}/avatar`,
                data,
            }),

        delete: (employeeId) =>
            apiClient.request({
                method: HTTP_METHODS.DELETE,
                url: `employees/${employeeId}/avatar`,
            }),
    },

    import: {
        downloadTemplate: () =>
            apiClient.request({
                method: HTTP_METHODS.GET,
                url: 'employees/import/template',
                responseType: HTTP_RESPONSE_TYPES.BLOB,
            }),

        parse: (data) =>
            apiClient.request({
                method: HTTP_METHODS.POST,
                url: 'employees/import/parse',
                data,
            }),

        apply: (data) =>
            apiClient.request({
                method: HTTP_METHODS.POST,
                url: 'employees/import/apply',
                data,
            }),
    },
};
