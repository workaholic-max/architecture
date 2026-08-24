import { apiClient } from '@api/client.ts';

import type { Employee } from '@domains/employees/types/employee.ts';
import type { EmployeeForm } from '@domains/employees/types/employee-form.ts';
import type { EmployeeImportRow } from '@domains/employees/types/employee-import-row.ts';
import type { EmployeeProfile } from '@domains/employees/types/employee-profile.ts';

export default {
    getAll: (params?: Record<string, unknown>) =>
        apiClient.request<Employee[]>({
            method: 'get',
            url: 'employees',
            params,
        }),

    getById: (employeeId: string) =>
        apiClient.request<Employee>({
            method: 'get',
            url: `employees/${employeeId}`,
        }),

    create: (data: EmployeeForm, params?: Record<string, unknown>) =>
        apiClient.request<Employee>({
            method: 'post',
            url: 'employees',
            data,
            params,
        }),

    update: (employeeId: string, data: EmployeeForm) =>
        apiClient.request<Employee>({
            method: 'put',
            url: `employees/${employeeId}`,
            data,
        }),

    delete: (employeeId: string, params?: Record<string, unknown>) =>
        apiClient.request<void>({
            method: 'delete',
            url: `employees/${employeeId}`,
            params,
        }),

    getProfile: (employeeId: string) =>
        apiClient.request<EmployeeProfile>({
            method: 'get',
            url: `employees/${employeeId}/profile`,
        }),

    avatar: {
        upload: (employeeId: string, data: FormData) =>
            apiClient.request<{ avatar_url: string }>({
                method: 'post',
                url: `employees/${employeeId}/avatar`,
                data,
            }),

        delete: (employeeId: string) =>
            apiClient.request<void>({
                method: 'delete',
                url: `employees/${employeeId}/avatar`,
            }),
    },

    import: {
        downloadTemplate: () =>
            apiClient.request<Blob>({
                method: 'get',
                url: 'employees/import/template',
                responseType: 'blob',
            }),

        parse: (data: FormData) =>
            apiClient.request<EmployeeImportRow[]>({
                method: 'post',
                url: 'employees/import/parse',
                data,
            }),

        apply: (data: EmployeeImportRow[]) =>
            apiClient.request<Employee[]>({
                method: 'post',
                url: 'employees/import/apply',
                data,
            }),
    },
};
