
module.exports = function compileCoffee(options) {
    return (content, fileName) => {
        const coffee = require('coffeescript');
        const out = coffee.compile(content, options);
        return [out, fileName.replace('.coffee', '.js')];
    };
}