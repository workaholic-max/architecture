export const isObject = (value) => Object.prototype.toString.call(value) === '[object Object]';

export const getNestedObjectValue = (source, path) =>
    path.reduce((state, fieldName) => (state ? state[fieldName] : null), source);

export const setNestedObjectValue = (source, path, value) => {
    const localPath = [...path];
    const lastKey = localPath.pop();

    const target = localPath.reduce((state, fieldName) => {
        if (!state[fieldName]) {
            state[fieldName] = {};
        }

        return state[fieldName];
    }, source);

    target[lastKey] = value;
};

export const extractFields = (obj, keys) => {
    if (!obj) {
        return null;
    }

    return keys.reduce((acc, key) => {
        if (key in obj) {
            acc[key] = obj[key];
        }

        return acc;
    }, {});
};
