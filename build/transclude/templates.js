"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Templates = /** @class */ (function () {
    function Templates(templates) {
        this.templates = templates;
    }
    Templates.prototype.transclude = function (file) {
        return "";
    };
    return Templates;
}());
exports.Templates = Templates;
var TemplatesBuilder = /** @class */ (function () {
    function TemplatesBuilder() {
        this.templates = {};
    }
    TemplatesBuilder.prototype.withTemplate = function (id, template) {
        this.templates[id] = template;
        return this;
    };
    TemplatesBuilder.prototype.build = function () {
        var templateSet = new Templates(this.templates);
        return templateSet;
    };
    TemplatesBuilder.prototype.withDirective = function (d) {
    };
    return TemplatesBuilder;
}());
exports.TemplatesBuilder = TemplatesBuilder;
//# sourceMappingURL=templates.js.map