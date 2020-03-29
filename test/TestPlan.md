# Test Plan

This document outlines the overall test plan for metalsmith-transclude 

This document outlines the requirements, scope, and high level testing scenarios for this package.
At the end is the testing matrix that maps tests back to the requirements to ensure complete coverage.

I'm a big believer in Test Driven Development and lots of planning and thinking. 
That doesn't mean that planning needs to be burdensome, time consuming, or add friction to the engineering process.
Additionally I subscribe to Kent Beck's [Test Desiderata][Desiderata]

## Requirements

As a consumer of this library:
1. When a metalsmith source file contains a reference to a template,
 I want the reference to be replaced with the contents of the template file
2. If the contents of a template refer to another template, then I want that replaced in the final output
3. I should be able to include some contents from the source file in the result of the transclusion
4. I should be able to specify arguments in the template
5. I should be able specify which portions of the template is included in the final result 
6. When configuring the module I should be able to specify an optional extension for the templates. For example `mytemplate.macro` can be reference in source files as `mytemplate`


## High Level scenarios

Id | Description
--- | ---
01.01-FlatTemplate | Test that we can do a simple transclude. This is a straight replacement of template reference with template contents
01.02-PathInId | Test that we can refer to templates in folders relative to the template root.
02-NestedTemplate | Test that a template can include references to another template. Final output does not contain template references
03-SourceContents | Content from the source file can be included in the final output
04.01-Parameters | Templates can specify parameters, and source file can supply parameter values. Optional defaults can be specified in the template.
04.02-ParametersAsArgs | Templates parameters can be specified in a single args="" param and pipe separated
05-IncludeOnly | Portions of the template can be excluded from replacement


