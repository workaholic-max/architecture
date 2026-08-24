import type { HttpBackendError, ValidationErrors } from '@shared/types/http-error.ts';

import { isObject } from '@shared/utils/object.ts';

import { HTTP_STATUS_CODE_VALUES, HTTP_STATUS_CODES, HttpStatusCode } from '@shared/enums/http.ts';

// ───────────────────────────────────────────────────────
// General
// ───────────────────────────────────────────────────────

const isHttpStatusCode = (value: unknown): value is HttpStatusCode =>
    HTTP_STATUS_CODE_VALUES.some((status) => status === value);

export const isHttpBackendError = (error: unknown): error is HttpBackendError => {
    if (!isObject(error) || !isObject(error.response) || !isObject(error.response.data)) {
        return false;
    }

    return isHttpStatusCode(error.response.status);
};

// ───────────────────────────────────────────────────────
// Error catchers
// ───────────────────────────────────────────────────────

export const catchForbiddenError = (error: unknown, callback: (message: string) => void) => {
    if (!isHttpBackendError(error)) return;

    const { status, data } = error.response;

    if (status === HTTP_STATUS_CODES.FORBIDDEN) {
        callback(data.message);
    }
};

export const catchNotFoundError = (error: unknown, callback: () => void) => {
    if (!isHttpBackendError(error)) return;

    const { status } = error.response;

    if (status === HTTP_STATUS_CODES.NOT_FOUND) {
        callback();
    }
};

export const catchUnprocessableEntityError = (error: unknown, callback: (errors: ValidationErrors) => void) => {
    if (!isHttpBackendError(error)) return;

    const { status, data } = error.response;

    if (status === HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY) {
        callback(data.errors ?? {});
    }
};
