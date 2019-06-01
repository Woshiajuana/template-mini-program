let Path = require('path');
let fs = require('fs');
let _loaderUtils = require('loader-utils');

module.exports = function (content) {
    let options = (0, _loaderUtils.getOptions)(this) || {};
    let { arr_source, source } = content;
    let { output, entry } = options;
    let obj_source = JSON.parse(source);
    let usingComponents = obj_source.usingComponents || {};
    let use_components = [];
    if (usingComponents) {
        for (let key in usingComponents) {
            let value = usingComponents[key];
            ['.js', '.json', '.wxml', '.wxss'].forEach((item) => {
                let file = `${value}${item}`;
                use_components.push({
                    source_dir: Path.join(this.context, file),
                    output_dir: Path.join(output, file.replace(/(\.\/|\.\.\/)/g, '')),
                });
            });
        }
    }
    content.use_components = use_components;
    return content;
};
