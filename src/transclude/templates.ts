import {Directive} from "./directive";

export class Templates {

    constructor(
        private templates: Record<string, string>
    ) {}

    transclude(file: string): string {
        return "";
    }
}

export class TemplatesBuilder {

    private templates: Record<string, string> = {};

    withTemplate(id: string, template: string): TemplatesBuilder {
        this.templates[id] = template;
        return this;
    }

    build(): Templates {
        let templateSet = new Templates(this.templates);
        return templateSet;
    }

    withDirective(d: Directive) {

    }
}