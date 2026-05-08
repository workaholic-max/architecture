import { apiClient } from '@api/client.ts';

import type { Employee } from '@domains/employees/types/employee.ts';
import type { EmployeeForm } from '@domains/employees/types/employee-form.ts';
import type { EmployeeImportRow } from '@domains/employees/types/employee-import-row.ts';
import type { EmployeeProfile } from '@domains/employees/types/employee-profile.ts';

import { HTTP_METHODS, HTTP_RESPONSE_TYPES } from '@shared/constants/http.ts';

export default {
    getAll: (params?: Record<string, unknown>) =>
        apiClient.request<Employee[]>({
            method: HTTP_METHODS.GET,
            url: 'employees',
            params,
        }),

    getById: (employeeId: string) =>
        apiClient.request<Employee>({
            method: HTTP_METHODS.GET,
            url: `employees/${employeeId}`,
        }),

    create: (data: EmployeeForm, params?: Record<string, unknown>) =>
        apiClient.request<Employee>({
            method: HTTP_METHODS.POST,
            url: 'employees',
            data,
            params,
        }),

    update: (employeeId: string, data: EmployeeForm) =>
        apiClient.request<Employee>({
            method: HTTP_METHODS.PUT,
            url: `employees/${employeeId}`,
            data,
        }),

    delete: (employeeId: string, params?: Record<string, unknown>) =>
        apiClient.request<void>({
            method: HTTP_METHODS.DELETE,
            url: `employees/${employeeId}`,
            params,
        }),

    getProfile: (employeeId: string) =>
        apiClient.request<EmployeeProfile>({
            method: HTTP_METHODS.GET,
            url: `employees/${employeeId}/profile`,
        }),

    avatar: {
        upload: (employeeId: string, data: FormData) =>
            apiClient.request<{ avatar_url: string }>({
                method: HTTP_METHODS.POST,
                url: `employees/${employeeId}/avatar`,
                data,
            }),

        delete: (employeeId: string) =>
            apiClient.request<void>({
                method: HTTP_METHODS.DELETE,
                url: `employees/${employeeId}/avatar`,
            }),
    },

    import: {
        downloadTemplate: () =>
            apiClient.request<Blob>({
                method: HTTP_METHODS.GET,
                url: 'employees/import/template',
                responseType: HTTP_RESPONSE_TYPES.BLOB,
            }),

        parse: (data: FormData) =>
            apiClient.request<EmployeeImportRow[]>({
                method: HTTP_METHODS.POST,
                url: 'employees/import/parse',
                data,
            }),

        apply: (data: EmployeeImportRow[]) =>
            apiClient.request<Employee[]>({
                method: HTTP_METHODS.POST,
                url: 'employees/import/apply',
                data,
            }),
    },
};
