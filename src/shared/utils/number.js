export const formatDecimal = (num, precision = 2) => {
    if (Number.isInteger(+num)) {
        return num;
    }

    const strNum = num.toString();
    const decimalPart = strNum.split('.')[1];

    if (decimalPart.length >= precision) {
        return strNum;
    }

    return `${strNum}0`;
};

export const cutFloatNumber = (num, precision = 2) => {
    if (Number.isInteger(+num)) {
        return num;
    }

    const strNum = `${num}0`;
    const dotIndex = strNum.indexOf('.') + 1;

    return strNum.slice(0, dotIndex + precision);
};
