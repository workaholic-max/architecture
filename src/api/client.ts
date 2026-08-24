import type { AxiosInstance, CreateAxiosDefaults } from 'axios';
import axios from 'axios';

import { AbortablePromise } from '@api/types/abortable-promise.ts';

import { useAppReloadStore } from '@shared/stores/app-reload.store.ts';

import { isHttpBackendError } from '@shared/utils/http.ts';

import { env } from '@shared/configs/env.ts';

import { HTTP_STATUS_CODES } from '@shared/enums/http.ts';

// ───────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────

type HttpMethod = 'get' | 'post' | 'put' | 'delete';
type HttpResponseType = 'json' | 'blob';

interface RequestConfig {
    method: HttpMethod;
    url: string;
    data?: unknown;
    params?: Record<string, unknown>;
    responseType?: HttpResponseType;
}

interface ResolvedRequestConfig extends RequestConfig {
    headers: Record<string, string>;
}

// ───────────────────────────────────────────────────────
// Implementation
// ───────────────────────────────────────────────────────

class ApiClient {
    instance: AxiosInstance;

    constructor(options: CreateAxiosDefaults) {
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

    _buildHeaders(data: unknown): Record<string, string> {
        if (data instanceof FormData) {
            return { 'Content-Type': 'multipart/form-data' };
        }

        return {};
    }

    _buildRequestConfig({ method, url, data, params }: RequestConfig): ResolvedRequestConfig {
        const headers = this._buildHeaders(data);

        return {
            method,
            url,
            data,
            params,
            headers,
        };
    }

    _wrapAbort<T>(request: Promise<{ data: T }>, controller: AbortController): AbortablePromise<T> {
        const wrapped = request.then(({ data }) => data) as AbortablePromise<T>;

        wrapped.abort = () => controller.abort();

        return wrapped;
    }

    request<T>({ method, url, responseType = 'json', data = {}, params = {} }: RequestConfig): AbortablePromise<T> {
        const controller = new AbortController();

        const requestConfig = this._buildRequestConfig({
            method,
            url,
            data,
            params,
        });

        const request = this.instance.request<T>({
            ...requestConfig,
            responseType,
            signal: controller.signal,
        });

        return this._wrapAbort(request, controller);
    }

    _handleErrorResponse(error: unknown) {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        if (isHttpBackendError(error) && error.response.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
            const appReloadStore = useAppReloadStore();

            appReloadStore.trigger();
        }

        throw error;
    }

    _addResponseInterceptor() {
        this.instance.interceptors.response.use(
            (response) => response,
            (error: unknown) => this._handleErrorResponse(error)
        );
    }
}

export const apiClient = new ApiClient({
    baseURL: env.apiBaseUrl,
});
