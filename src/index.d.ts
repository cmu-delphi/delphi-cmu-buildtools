declare module 'delphi-cmu-buildtools' {
    interface Processor {
        (content: string, fileName: string): [string, string] | string;
    }
    interface ProcessOptions { srcDir?: string, dstDir?: string };
    function process(glob: string, processors: readonly Processor[], options?: ProcessOptions): Promise<string[]>;
    function processFile(file: string, processors: readonly Processor[], options?: ProcessOptions): Promise<string>;

    function compileCoffee(options?: any): Processor;
    function minimizeJs(options?: any): Processor;
    function rename(renameCallback: (fileName: string) => string): Processor;
    function replace(entries: readonly [string, string][]): Processor;
}