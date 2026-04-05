export const useEntityFormState = () => {
    let initialPayloadJSON = null;

    const state = reactive({
        data: null,
        validationErrors: null,
        errorMessage: null,
        isDataLoading: false,
        isSubmitting: false,
        isReady: false,
    });

    const update = (updatedData) => Object.assign(state, updatedData);

    const hasLoadFailed = () => !state.isDataLoading && state.data === null;

    const markAsReady = (initialPayload = null) => {
        state.isReady = true;

        if (initialPayload !== null) {
            initialPayloadJSON = JSON.stringify(initialPayload);
        }
    };

    const isPayloadInitial = (payload) => {
        if (initialPayloadJSON === null) {
            return false;
        }

        try {
            return JSON.stringify(payload) === initialPayloadJSON;
        } catch (_) {
            return false;
        }
    };

    const setValidationErrors = (errors) => {
        state.validationErrors = errors;
        state.isSubmitting = false;
    };

    const setErrorMessage = (message) => {
        state.errorMessage = message;
        state.isSubmitting = false;
    };

    return {
        entityFormState: state,
        entityFormMethods: {
            update,
            hasLoadFailed,
            markAsReady,
            isPayloadInitial,
            setValidationErrors,
            setErrorMessage,
        },
    };
};
