import type { RouteLocationGeneric, RouteLocationRaw } from 'vue-router';

import type { Employee } from '@domains/employees/types/employee.ts';
import { Nullable } from '@shared/types/utility.ts';

export interface GuardContext {
    to: RouteLocationGeneric;
    employee: Nullable<Employee>;
}

export type GuardResult = null | true | RouteLocationRaw;

export type Guard = (context: GuardContext) => GuardResult;
