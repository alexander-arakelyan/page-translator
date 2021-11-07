export const TextUtils = {
    selected: (elem) => {
        const val = elem.value;
        const start = elem.selectionStart;
        const end = elem.selectionEnd;
        const substr = val.substring(start, end);
        return substr;
    }
}
