import fs from 'fs';
import path from 'path';
import match from 'multimatch';
import {Plugin} from 'metalsmith';
import {Templates, TemplatesBuilder} from "./transclude/templates";


interface Options {
    pattern: string | string[];    // Pattern to match source files 
    templates: string;    // Path to template files
    extension: string | undefined;  // Optional extension file
}

export = main;

function main(opts: Partial<Options>): Plugin {

    // plugin export
    return async function transclude(files, metalsmith, done) {
        const options: Options = {
            pattern: "**/*",
            templates: 'templates',
            extension: undefined,
            ...opts,
        };

        try {
            // filter for processing files
            const validFiles = match(Object.keys(files), options.pattern);

            if (validFiles.length === 0) {
                throw new Error(`Pattern '${options.pattern}' did not match any source files.`)
            }

            let layouts = {} as Record<string, string>;

            // load partials and helpers concurrently, if present
            const tasks: Promise<any>[] = [];

            let dir = path.join(metalsmith.directory(), options.templates);
            await registerTemplates(dir);


            


            // compiler files concurrently
            // await Promise.all(validFiles.map(filename => (
            //     render(filename, files[filename], settings))
            // ));
            //
            // // rename files (i.e. .hbs -> .html)
            // for (let filename of validFiles) {
            //     move(files, filename, options.extension);
            // }
            done(null, files, metalsmith);
        }
        catch (err) {
            done(err, files, metalsmith);
        }
    }
}


/**
 * Load a directory of templates and convert to in memory structure
 */
async function registerTemplates(directory: string) {
    console.group(`Registering templates in: ${directory}`);
    const filenames = await loadFiles(directory);
    let builder = new TemplatesBuilder();
    for (let filename of filenames) {
        const { dir, name } = path.parse(filename);

        let templateId = path.join(dir.replace(directory, ""), path.sep, name);

        const file = await asyncRead(filename);
        if (!file) continue;

        builder.withTemplate(templateId, file);
    }
    console.groupEnd()
    return builder.build();
}



/**
 * Load a directory into a list of string paths.
 * @param {string} directory
 * @return {string[]}
 */
async function loadFiles(directory: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                const paths = files.map(file => path.resolve(directory, file));
                resolve(paths);
            }
        });
    });
}

/**
 * Render a template into file.contents.
 * TODO: A better name?
 */
function render(filename: string, file: any, settings: any) {
    return new Promise(resolve => {
        // separate 'contents' from context
        const {contents, ...locals} = file;

        // rewrite contents from compiler()
        // file.contents = Buffer.from(compile(
        //     filename,
        //     contents.toString(),
        //     {...settings.metadata, ...locals}, // global + local context
        //     settings,
        // ));
        resolve();
    })
}

/**
 * Read a file as a string.
 */
async function asyncRead(filepath: string): Promise<string|null> {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, {encoding: 'utf-8'}, (err, contents) => {
            // silently fail on directories
            if (err && err.code === 'EISDIR') {
                resolve(null);
            }
            // raise errors otherwise
            else if (err) {
                reject(err);
            }
            // all good
            else {
                resolve(contents);
            }
        })
    })
}

// export utility functions for testing
main.registerPartials = registerTemplates;
main.asyncRead = asyncRead;