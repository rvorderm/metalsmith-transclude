export declare class Directive {
    id: string;
    parameters?: string[] | undefined;
    contents?: string | undefined;
    constructor(id: string, parameters?: string[] | undefined, contents?: string | undefined);
}
export declare class DirectiveBuilder {
    private id;
    private parameters;
    private contents?;
    withId(id: string): this;
    withParameter(name: string): DirectiveBuilder;
    withContents(contents: string): this;
    build(): Directive | undefined;
}
//# sourceMappingURL=directive.d.ts.map