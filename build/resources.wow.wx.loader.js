
let _loaderUtils = require('loader-utils');
let Cheerio = require('cheerio');

let Resources = function (source, webpack) {
    this.options = (0, _loaderUtils.getOptions)(webpack) || {};
    this.arr_source = [];
    this.source = source;
    return this.query(source, webpack).filter(source, webpack);
};

// 查找
Resources.prototype.query = function (source, webpack) {
    let { use_source, use_image } = this.options;
    if (use_source) this.getSourceDir(webpack);
    if (this.source_dir) this.arr_source.push(this.source_dir);
    if (use_image) {
        let $ = Cheerio.load(source);
        $('img').each((index, item) => {
            let src = $(item).attr('src');
            if (src && src.indexOf('./') > -1 && this.arr_source.indexOf(src) === -1)
                this.arr_source.push(src);
        });
        $('view').each((index, item) => {
            let style = $(item).attr('style');
            if (!style || style.indexOf('url(.') === -1) return null;
            let src = style.substring(style.indexOf('../'), style.indexOf(')'));
            this.arr_source.indexOf(src) === -1 && this.arr_source.push(src);
        })
    }
    return this;
};

// 过滤
Resources.prototype.filter = function (source, webpack) {
    let { use_filter } = this.options;
    if (use_filter && use_filter.length) {
        this.arr_source.forEach((item, index) => {
            use_filter.forEach((filter) => {
                if (item.indexOf(filter) > -1) this.arr_source.splice(index, 1);
            })
        })
    }
    return this;
};

// 本路径
Resources.prototype.getSourceDir = function (webpack) {
    this.source_dir = webpack.resource;
    return this;
};

module.exports = function (source) {
    return new Resources(source, this);
};

