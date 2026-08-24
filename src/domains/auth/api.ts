import { apiClient } from '@api/client.ts';

import type { LoginForm } from '@domains/auth/types/login-form.ts';
import type { User } from '@domains/auth/types/user.ts';

export default {
    login: (data: LoginForm) =>
        apiClient.request<User>({
            method: 'post',
            url: 'auth/login',
            data,
        }),

    logout: () =>
        apiClient.request<void>({
            method: 'post',
            url: 'auth/logout',
        }),
};
