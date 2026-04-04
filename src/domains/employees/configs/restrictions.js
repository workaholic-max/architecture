import { isAdmin } from '@domains/employees/utils/roles.js';

export const EMPLOYEES_RESTRICTIONS = {
    EDIT: (account, target) => !isAdmin(target) || isAdmin(account),
    DELETE: (account, target) => !isAdmin(target) && account.id !== target.id,
};
