"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Directive = /** @class */ (function () {
    function Directive(id, parameters, contents) {
        this.id = id;
        this.parameters = parameters;
        this.contents = contents;
    }
    return Directive;
}());
exports.Directive = Directive;
var DirectiveBuilder = /** @class */ (function () {
    function DirectiveBuilder() {
        this.parameters = [];
    }
    DirectiveBuilder.prototype.withId = function (id) {
        this.id = id;
        return this;
    };
    DirectiveBuilder.prototype.withParameter = function (name) {
        this.parameters.push(name);
        return this;
    };
    DirectiveBuilder.prototype.withContents = function (contents) {
        this.contents = contents;
        return this;
    };
    DirectiveBuilder.prototype.build = function () {
        if (!this.id) {
            return undefined;
        }
        return new Directive(this.id, this.parameters, this.contents);
    };
    return DirectiveBuilder;
}());
exports.DirectiveBuilder = DirectiveBuilder;
//# sourceMappingURL=directive.js.map