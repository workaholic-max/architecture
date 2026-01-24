export const normalizeStr = (str) => String(str).trim().toLowerCase();

export const capitalizeFirstLetter = (word) => {
    if (!word) {
        return null;
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
};
