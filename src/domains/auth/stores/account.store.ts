import { defineStore } from 'pinia';

import type { Employee } from '@domains/employees/types/employee.ts';
import type { Nullable } from '@shared/types/nullable.ts';

import { EMPLOYEE_MOCK_DATA } from '@domains/employees/mocks/employee.ts';

export const useAccountStore = defineStore('account', () => {
    const account = ref<Nullable<Employee>>(EMPLOYEE_MOCK_DATA);

    const setAccount = (employee: Nullable<Employee>) => {
        account.value = employee;
    };

    return {
        account,
        setAccount,
    };
});
