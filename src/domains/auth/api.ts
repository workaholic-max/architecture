import { apiClient } from '@api/client.ts';

import type { LoginForm } from '@domains/auth/types/login-form.ts';
import type { User } from '@domains/auth/types/user.ts';

import { HTTP_METHODS } from '@shared/constants/http.ts';

export default {
    login: (data: LoginForm) =>
        apiClient.request<User>({
            method: HTTP_METHODS.POST,
            url: 'auth/login',
            data,
        }),

    logout: () =>
        apiClient.request<void>({
            method: HTTP_METHODS.POST,
            url: 'auth/logout',
        }),
};
