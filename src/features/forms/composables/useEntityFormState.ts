import { reactive } from 'vue';

import { Nullable } from '@shared/types/nullable.ts';

interface EntityFormState<T> {
    data: Nullable<T>;
    validationErrors: Nullable<Record<string, string[]>>;
    errorMessage: Nullable<string>;
    isDataLoading: boolean;
    isSubmitting: boolean;
    isReady: boolean;
}

export const useEntityFormState = <T>() => {
    let initialPayloadJSON: Nullable<string> = null;

    const state = reactive<EntityFormState<T>>({
        data: null,
        validationErrors: null,
        errorMessage: null,
        isDataLoading: false,
        isSubmitting: false,
        isReady: false,
    });

    const hasLoadFailed = () => !state.isDataLoading && state.data === null;

    const markAsReady = (initialPayload: unknown = null) => {
        state.isReady = true;

        if (initialPayload !== null) {
            initialPayloadJSON = JSON.stringify(initialPayload);
        }
    };

    const isPayloadInitial = (payload: unknown) => {
        if (initialPayloadJSON === null) {
            return false;
        }

        try {
            return JSON.stringify(payload) === initialPayloadJSON;
        } catch {
            return false;
        }
    };

    const setValidationErrors = (errors: Record<string, string[]>) => {
        state.validationErrors = errors;
        state.isSubmitting = false;
    };

    const setErrorMessage = (message: string) => {
        state.errorMessage = message;
        state.isSubmitting = false;
    };

    return {
        entityFormState: state,
        entityFormMethods: {
            hasLoadFailed,
            markAsReady,
            isPayloadInitial,
            setValidationErrors,
            setErrorMessage,
        },
    };
};
