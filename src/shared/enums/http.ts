export const HTTP_METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export const HTTP_RESPONSE_TYPES = {
    JSON: 'json',
    BLOB: 'blob',
} as const;

export type HttpResponseType = (typeof HTTP_RESPONSE_TYPES)[keyof typeof HTTP_RESPONSE_TYPES];

export const HTTP_STATUS_CODES = {
    INTERNAL_SERVER_ERROR: 500,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
};
