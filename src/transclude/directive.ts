export class Directive {

    constructor(
        public id: string,
        public parameters?: string [],
        public contents?: string
    ) {
    }
}

export class DirectiveBuilder {

    private id: string | undefined;
    private parameters: string [] = [];
    private contents?: string

    withId(id: string) {
        this.id = id;
        return this;
    }

    withParameter(name: string): DirectiveBuilder {
        this.parameters.push(name);
        return this;
    }

    withContents(contents: string) {
        this.contents = contents;
        return this;
    }

    build(): Directive | undefined {
        if (!this.id) {
            return undefined;
        }
        return new Directive(this.id, this.parameters, this.contents)
    }
}