import { Nullable } from '@shared/types/nullable.ts';

let originalTitle: Nullable<string> = null;

const ensureInitialized = (): string => {
    if (originalTitle === null) {
        throw new Error('documentService is not initialized.');
    }

    return originalTitle;
};

const init = () => {
    originalTitle = window.document.title;
};

const setTitleBadge = (count = 0) => {
    const resolvedTitle = ensureInitialized();

    window.document.title = count > 0 ? `${resolvedTitle} (${count})` : resolvedTitle;
};

export const documentService = {
    init,
    setTitleBadge,
};
