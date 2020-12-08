
module.exports = function rename(renameCallback) {
    return (content, fileName) => {
        return [content, renameCallback(fileName)];
    }
}