
const fs = require('fs-extra');
const path = require('path');
import {
    output
} from 'wow-cmd'
// const output = require('../utils/output.util');
const cmdPath = process.cwd();

class Generate {

    constructor () {
        this.router = {};
        this.pages = [];
    }

    loopDirectory () {
        let _that = this;
        (function walk(dir) {
            dir = dir || '.';
            let directory = path.join(cmdPath, 'src/pages', dir);
            fs.readdirSync(directory).forEach( (file) => {
                let full_path = path.join(directory, file);
                let stat = fs.statSync(full_path);
                let ext_name = path.extname(full_path);
                if (stat.isFile() && ext_name === '.wxml') {
                    let file_path = path.join(dir, path.basename(file, ext_name));
                    let file_path_arr = file_path.replace(/\\/g, '/').split('\/');
                    let file_path_name_arr = _that._unique(file_path_arr);
                    let name = file_path_name_arr.join('_');
                    let p = 'pages/' +file_path_arr.join('/');
                    _that.pages.push(p);
                    _that.router[name] = '/' + p;
                } else if (stat.isDirectory()) {
                    let sub_dir = path.join(dir, file);
                    walk(sub_dir);
                }
            })
        })();
        return this;
    }

    _unique (array) {
        let n = [];
        for(let i = 0; i < array.length; i++){
            if (n.indexOf(array[i]) === -1) n.push(array[i]);
        }
        return n;
    }

    start (entry) {
        let AppJson = require(path.join(cmdPath, 'src/app.json'));
        let page = this.router[entry];
        if (page) {
            page = page.replace('/', '');
            this.pages.splice(this.pages.indexOf(page), 1);
            this.pages.unshift(page);
        }
        output.info('page.cmd=>', `${this.pages[0]} 为入口页`);
        AppJson.pages = this.pages;
        fs.writeFileSync(path.join(cmdPath, 'src/app.json'), JSON.stringify(AppJson, null, 4));
        fs.ensureDirSync(path.join(cmdPath, 'src/config'));
        fs.writeFileSync(path.join(cmdPath, 'src/config/router.config.js'), 'export default ' + JSON.stringify(this.router, null, 4));
        return this;
    }

}

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    try {
        output.info('page.cmd=>', `即将生成app.json`);
        const generate = new Generate();
        generate.loopDirectory().start(params);
        output.success('page.cmd=>', `生成app.json操作完成`);
    } catch (e) {
        output.error('page.cmd=>', `生成app.json操作失败：${e}`);
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-p', '--page'],
};

export default Handle;
