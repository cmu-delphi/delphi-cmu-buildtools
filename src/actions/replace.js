
module.exports = function replace(entries = []) {
    return (content) => {
        let c = content;
        for (const entry of entries) {
            c = c.split(entry[0]).join(entry[1]);
        }
        return c;
    }
};