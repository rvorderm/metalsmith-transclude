import { Directive } from "./directive";
export declare class Templates {
    private templates;
    constructor(templates: Record<string, string>);
    transclude(file: string): string;
}
export declare class TemplatesBuilder {
    private templates;
    withTemplate(id: string, template: string): TemplatesBuilder;
    build(): Templates;
    withDirective(d: Directive): void;
}
//# sourceMappingURL=templates.d.ts.map