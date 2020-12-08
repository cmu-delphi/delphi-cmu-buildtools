
module.exports = function minimizeJs(options = {}) {
    return async (content) => {
        const terser = require('terser');
        const r = await terser.minify(content, {
            compress: true,
            mangle: true,
            ...options,
        });
        return r.code;
    };
}