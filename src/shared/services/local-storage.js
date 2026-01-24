const getPrefixedKey = (key) => `ml.architecture.${key}`;

const get = (key, defaultValue = null) => {
    const value = window.localStorage.getItem(getPrefixedKey(key));

    if (value === null) {
        return defaultValue;
    }

    try {
        return JSON.parse(value);
    } catch {
        return defaultValue;
    }
};

const set = (key, value) => {
    try {
        window.localStorage.setItem(getPrefixedKey(key), JSON.stringify(value));
    } catch {}
};

const remove = (key) => {
    window.localStorage.removeItem(getPrefixedKey(key));
};

export const localStorageService = {
    get,
    set,
    remove,
};
