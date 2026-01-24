import axios from 'axios';

import { HTTP_RESPONSE_TYPES } from '@shared/constants/http.js';

class ApiClient {
    constructor(options) {
        this.instance = axios.create({
            ...options,
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
        });

        this._addResponseInterceptor();
    }

    _buildHeaders(data) {
        if (data instanceof FormData) {
            return { 'Content-Type': 'multipart/form-data' };
        }

        return {};
    }

    _buildRequestConfig({ method, url, data, params }) {
        const headers = this._buildHeaders(data);

        return {
            method,
            url,
            data,
            params,
            headers,
        };
    }

    _wrapAbort(request, controller) {
        const wrapped = request.then(({ data }) => data);

        wrapped.abort = () => controller.abort();

        return wrapped;
    }

    /**
     * @return {Promise}
     */
    request({ method, url, responseType = HTTP_RESPONSE_TYPES.JSON, data = {}, params = {} }) {
        const controller = new AbortController();

        const requestConfig = this._buildRequestConfig({
            method,
            url,
            data,
            params,
        });

        const request = this.instance.request({
            ...requestConfig,
            responseType,
            signal: controller.signal,
        });

        return this._wrapAbort(request, controller);
    }

    _handleErrorResponse(error) {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }

    _addResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => this._handleErrorResponse(error)
        );
    }
}

export const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
