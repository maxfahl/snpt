export const matchAll = (string, regex) => {
    const internalMatchAll = (string, regex, index) => {
        index || (index = 1); // default to the first capturing group
        let matches = [];
        let match;
        while ((match = regex.exec(string))) {
            matches.push(match[index]);
        }
        return matches;
    };
    return internalMatchAll(string, regex, 1);
};
