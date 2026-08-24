import { HttpStatusCode } from '@shared/enums/http.ts';

export type ValidationErrors = Record<string, string[]>;

export interface HttpBackendError {
    response: {
        status: HttpStatusCode;
        data: {
            message: string;
            errors?: ValidationErrors;
        };
    };
}
