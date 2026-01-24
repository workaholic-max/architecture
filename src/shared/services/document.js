let originalTitle = null;

const ensureInitialized = () => {
    if (originalTitle === null) {
        throw new Error('documentService is not initialized.');
    }
};

const init = () => {
    originalTitle = window.document.title;
};

const setTitleBadge = (count = 0) => {
    ensureInitialized();

    window.document.title = count > 0 ? `${originalTitle} (${count})` : originalTitle;
};

export const documentService = {
    init,
    setTitleBadge,
};
