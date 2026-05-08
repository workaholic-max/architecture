import type { Employee } from '@domains/employees/types/employee.ts';

import { isAdmin } from '@domains/employees/utils/roles.ts';

export const EMPLOYEES_RESTRICTIONS = {
    EDIT: (account: Employee, target: Employee) => !isAdmin(target) || isAdmin(account),
    DELETE: (account: Employee, target: Employee) => !isAdmin(target) && account.id !== target.id,
};
