export const invalidateString = (str) => {
    if (str == null || str.trim().length < 1) {
        return true;
    }
    return false;
}