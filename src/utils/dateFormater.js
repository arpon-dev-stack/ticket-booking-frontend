export const convertToLocal = (ISODate) => {
    const newDate = new Date(ISODate);
    const formetDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(newDate)
    return formetDate;
};

export const convertToISO = (localDate) => {
    const newDate = new Date(localDate);
    const formetDate = newDate.toISOString();
    return formetDate;
}