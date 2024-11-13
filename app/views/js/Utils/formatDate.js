export const isValidDateFormat = (dateString, formatPattern) => {
    const pattern = formatPattern === 'yyyy-MM-dd' ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{2}\/\d{2}\/\d{4}$/;
    return pattern.test(dateString);
};
