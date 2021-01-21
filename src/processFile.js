const promisify = require('util').promisify;
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const path = require('path');


const checkedDir = new Set();
function ensureDir(fileName) {
    const dir = path.dirname(fileName);
    if (checkedDir.has(dir)) {
        return;
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    };
    checkedDir.add(dir);
}


module.exports = async function processFile(file, processors, { srcDir = './site', dstDir = './build' } = {}) {
    const inputFile = path.join(srcDir, file);
    let outputFile = path.join(dstDir, file);

    if (processors.length === 0) {
        // copy
        ensureDir(outputFile);
        await copyFile(inputFile, outputFile);
    } else {
        let content = await readFile(inputFile, { encoding: 'utf-8' });
        let outputFileName = file;
        for await (const process of processors) {
            const out = await process(content, outputFileName);
            if (Array.isArray(out)) {
                [content, outputFileName] = out;
            } else {
                content = out;
            }
        }
        outputFile = path.join(dstDir, outputFileName);
        ensureDir(outputFile);
        await writeFile(outputFile, content, { encoding: 'utf-8' });
    }
    return outputFile;
}