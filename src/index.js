const promisify = require('util').promisify;
const glob = promisify(require('glob'));
const processFile = require('./processFile');

async function process(pattern, processors = [], { srcDir = './site', dstDir = './build' } = {}) {
    const files = await glob(pattern, { cwd: srcDir });
    return Promise.all(files.map((file) => processFile(file, processors, { srcDir, dstDir })));
}

module.exports.process = process;
module.exports.processFile = processFile;
Object.assign(module.exports, require('./actions'));