export const canAccessRoute = (employee, permission = null) => {
    if (permission === null) {
        return true;
    }

    const { permissions } = employee;
    const { keys, key } = permission;

    if (Array.isArray(keys)) {
        return keys.some((key) => permissions[key]);
    }

    return Boolean(permissions[key]);
};
