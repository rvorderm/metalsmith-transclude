import { Plugin } from 'metalsmith';
interface Options {
    pattern: string | string[];
    templates: string;
    extension: string | undefined;
}
export = main;
declare function main(opts: Partial<Options>): Plugin;
declare namespace main {
    var move: any;
    var registerPartials: typeof registerTemplates;
    var registerHelpers: any;
    var loadLayouts: any;
    var asyncRead: (filepath: string) => Promise<string | null>;
    var Handlebars: any;
}
/**
 * Load a directory of templates and convert to in memory structure
 */
declare function registerTemplates(directory: string): Promise<any>;
//# sourceMappingURL=index.d.ts.map