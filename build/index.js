"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var multimatch_1 = __importDefault(require("multimatch"));
var templates_1 = require("./transclude/templates");
function main(opts) {
    // plugin export
    return function transclude(files, metalsmith, done) {
        return __awaiter(this, void 0, void 0, function () {
            var options, validFiles, layouts, tasks, dir, validFiles_1, validFiles_1_1, filename, err_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = __assign({ pattern: "**/*", templates: 'templates', extension: undefined }, opts);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        validFiles = multimatch_1.default(Object.keys(files), options.pattern);
                        if (validFiles.length === 0) {
                            throw new Error("Pattern '" + options.pattern + "' did not match any source files.");
                        }
                        layouts = {};
                        tasks = [];
                        dir = path_1.default.join(metalsmith.directory(), options.templates);
                        return [4 /*yield*/, registerTemplates(dir)];
                    case 2:
                        _b.sent();
                        // compiler files concurrently
                        return [4 /*yield*/, Promise.all(validFiles.map(function (filename) { return (render(filename, files[filename], settings)); }))];
                    case 3:
                        // compiler files concurrently
                        _b.sent();
                        try {
                            // rename files (i.e. .hbs -> .html)
                            for (validFiles_1 = __values(validFiles), validFiles_1_1 = validFiles_1.next(); !validFiles_1_1.done; validFiles_1_1 = validFiles_1.next()) {
                                filename = validFiles_1_1.value;
                                move(files, filename, options.extension);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (validFiles_1_1 && !validFiles_1_1.done && (_a = validFiles_1.return)) _a.call(validFiles_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        done(null, files, metalsmith);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        done(err_1, files, metalsmith);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
}
/**
 * Load a directory of templates and convert to in memory structure
 */
function registerTemplates(directory) {
    return __awaiter(this, void 0, void 0, function () {
        var filenames, builder, filenames_1, filenames_1_1, filename, _a, dir, name_1, templateId, file, e_2_1;
        var e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.group("Registering templates in: " + directory);
                    return [4 /*yield*/, loadFiles(directory)];
                case 1:
                    filenames = _c.sent();
                    builder = new templates_1.TemplateSetBuilder();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 7, 8, 9]);
                    filenames_1 = __values(filenames), filenames_1_1 = filenames_1.next();
                    _c.label = 3;
                case 3:
                    if (!!filenames_1_1.done) return [3 /*break*/, 6];
                    filename = filenames_1_1.value;
                    _a = path_1.default.parse(filename), dir = _a.dir, name_1 = _a.name;
                    templateId = path_1.default.join(dir.replace(directory, ""), path_1.default.sep, name_1);
                    return [4 /*yield*/, asyncRead(filename)];
                case 4:
                    file = _c.sent();
                    if (!file)
                        return [3 /*break*/, 5];
                    builder.withTemplate(templateId, file);
                    _c.label = 5;
                case 5:
                    filenames_1_1 = filenames_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (filenames_1_1 && !filenames_1_1.done && (_b = filenames_1.return)) _b.call(filenames_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9:
                    console.groupEnd();
                    return [2 /*return*/, builder.build()];
            }
        });
    });
}
/**
 * Load a directory into a list of string paths.
 * @param {string} directory
 * @return {string[]}
 */
function loadFiles(directory) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs_1.default.readdir(directory, function (err, files) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            var paths = files.map(function (file) { return path_1.default.resolve(directory, file); });
                            resolve(paths);
                        }
                    });
                })];
        });
    });
}
/**
 * Render a template into file.contents.
 * TODO: A better name?
 */
function render(filename, file, settings) {
    return new Promise(function (resolve) {
        // separate 'contents' from context
        var contents = file.contents, locals = __rest(file, ["contents"]);
        // rewrite contents from compiler()
        file.contents = Buffer.from(compile(filename, contents.toString(), __assign(__assign({}, settings.metadata), locals), // global + local context
        settings));
        resolve();
    });
}
/**
 * Read a file as a string.
 */
function asyncRead(filepath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fs_1.default.readFile(filepath, { encoding: 'utf-8' }, function (err, contents) {
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
                    });
                })];
        });
    });
}
// export utility functions for testing
main.move = move;
main.registerPartials = registerTemplates;
main.registerHelpers = registerHelpers;
main.loadLayouts = loadLayouts;
main.asyncRead = asyncRead;
main.Handlebars = Handlebars;
module.exports = main;
//# sourceMappingURL=index.js.map