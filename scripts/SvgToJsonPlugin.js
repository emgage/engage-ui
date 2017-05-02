const path = require('path');
const SVGO = require('svgo');
const loaderUtils = require('loader-utils');
const FS = require('fs');

const VIEWBOX_REGEX = /viewBox="([^"]*)"/;
const SVG_REGEX = /(<svg[^>]*>|<\/svg>)/g;
const FILL_REGEX = /fill="[^"]*"/g;

const svgo = new SVGO({
    plugins: [
        {removeTitle: true},
        {removeDimensions: true},
    ],
});

module.exports = function(content) {
    if (path.extname(this.resourcePath) !== '.svg') {
        throw new Error("The loader only works on SVG files.")
    }

    var callback = this.async();

    FS.readFile(this.resourcePath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        svgo.optimize(data, (result) => {
            const finalSource = result.data.replace(FILL_REGEX, (fill) => {
                return fill.includes('#FFF') ? 'fill="currentColor"' : '';
            });

            const viewBox = VIEWBOX_REGEX.exec(finalSource)[1];
            const svgExport = JSON.stringify({
                viewBox,
                body: finalSource.replace(SVG_REGEX, ''),
            });

            callback(null, 'export default ' + svgExport + ';');
        });
    });
};
