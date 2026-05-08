export const cutFloatNumber = (num: number, precision = 2) => {
    if (Number.isInteger(num)) {
        return num;
    }

    const factor = 10 ** precision;

    return Math.trunc(num * factor) / factor;
};
