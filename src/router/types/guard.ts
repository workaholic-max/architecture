import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

import type { Employee } from '@domains/employees/types/employee.ts';
import { Nullable } from '@shared/types/nullable.ts';

export interface GuardContext {
    to: RouteLocationNormalized;
    employee: Nullable<Employee>;
}

export type GuardResult = null | true | RouteLocationRaw;

export type Guard = (context: GuardContext) => GuardResult;
