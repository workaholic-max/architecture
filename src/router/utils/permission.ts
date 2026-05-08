import type { PermissionMeta } from '@router/types/meta.ts';
import type { Employee } from '@domains/employees/types/employee.ts';

export const canAccessRoute = (employee: Employee, permission?: PermissionMeta): boolean => {
    if (!permission) {
        return true;
    }

    const { permissions } = employee;

    if ('keys' in permission) {
        return permission.keys.some((key) => permissions[key]);
    }

    return Boolean(permissions[permission.key]);
};
