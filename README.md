# CMU Delphi Build Tools

a set of build helper similar to https://github.com/cmu-delphi/github-deploy-repo.

The main idea is a simplified version of tools like gulp or grunt while keeping close to the original script.

One processes a given set of files identified by a [glob pattern](https://github.com/isaacs/node-glob) and processes the content with zero or more processors.
In case of no processor is specified, the files will be directly copied.

## Usage

### Install

1. `npm install -D github:sgratzl/delphi-cmu-buildtools`

### Build Script

`build.js`

```js
const { process, minimizeJs, compileCoffee } = require("delphi-cmu-buildtools");

Promise.all([
  process("**/*.coffee", [compileCoffee(), minimizeJs()]),
  process("**/*.js", [minimizeJs()]),
  process("**/*.+(html|css)"),
]).then((r) => console.log(r.flat()));
```

## Processors

- `compileCoffee(coffeeScriptOptions)` ... compiles coffee script
- `minimizeJs(terserOptions)` ... minimizes the code using terser
- `replace(entries: [string, string][])` ... replaces the given set of entries (from, to) in the file
- `rename(renameCallback: (fileName: string) => string)` ... allows to rename the target file

## License

MIT License, 2020
