import { describe, expect, it } from 'vitest';

import { EMPLOYEE_MOCK_DATA } from '@domains/employees/mocks/employee.ts';

import { canAccessRoute } from '@router/utils/permission.ts';

import { DASHBOARD_PERMISSION_KEYS } from '@domains/dashboard/configs/permissions.ts';
import { EMPLOYEES_PERMISSION_KEYS } from '@domains/employees/configs/permissions.ts';

describe('canAccessRoute', () => {
    it('allows routes without permission metadata', () => {
        expect(canAccessRoute(EMPLOYEE_MOCK_DATA)).toBe(true);
    });

    it('allows access when the employee has the required permission key', () => {
        expect(canAccessRoute(EMPLOYEE_MOCK_DATA, { key: EMPLOYEES_PERMISSION_KEYS.VIEW })).toBe(true);
    });

    it('denies access when the employee does not have the required permission key', () => {
        expect(canAccessRoute(EMPLOYEE_MOCK_DATA, { key: EMPLOYEES_PERMISSION_KEYS.MANAGE })).toBe(false);
    });

    it('allows access when any accepted permission key is present', () => {
        expect(
            canAccessRoute(EMPLOYEE_MOCK_DATA, {
                keys: [DASHBOARD_PERMISSION_KEYS.MANAGE, EMPLOYEES_PERMISSION_KEYS.VIEW],
            })
        ).toBe(true);
    });
});
