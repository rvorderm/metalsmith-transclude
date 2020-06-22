const test = require('tape');
const path = require('path');
const fs = require('fs');
const Metalsmith = require('metalsmith');
const transclude = require('./build/index');

test("Invalid path to templates", assert => {
    create()
        .use(transclude({
            templates: "flurg"
        }))
        .build((err, files) => {
            assert.ok(!!err, "");
            assert.end();
        })
});

test("Build example tests", assert => {
    create()
        // our plugin
        .use(transclude({
            templates: "test/templates"
        }))
        .build((err, files) => {
            if (err) assert.fail(err);

            var assertFile = (fileName) => { compareFile(assert, files, fileName) };
            assertFile('01.01-FlatTemplate');
            assertFile('01.02-PathInId');
            assertFile('02-NestedTemplate');
            assertFile('03-SourceContents');
            assertFile('04.01-ParameterDefaults');
            assertFile('04.01-Parameters');
            assertFile('04.02-ParametersAsArgs');
            assertFile('05-IncludeOnly');

            assert.end();
        })
});

function compareFile(assert, files, fileName) {
    {
        assert.ok(files[fileName], `verify output [${fileName}]`);
        const actual = files[fileName].contents.toString();
        const expected = fs.readFileSync(`test/expected/${fileName}`, 'utf-8');
        assert.equal(actual, expected, `output matches [${fileName}]`);
    }
}

// shorthand
function create() {
    return new Metalsmith(path.resolve(__dirname, 'test/'))
        .clean(true)
        .source('src')
        .destination('dest')
        .metadata({
            author: 'Me.',
        })
}