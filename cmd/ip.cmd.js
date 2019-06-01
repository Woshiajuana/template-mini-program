
import fs from 'fs-extra'
import path from 'path'
import {
    log
} from 'wow-cmd'

const Handle = (options, data) => new Promise((resolve, reject) => {
    let {
        params,
        parameters,
    } = options;
    let regular = /^\d+\.\d+\.\d+\.\d+$/;
    if (!regular.test(params)) {
        log(`IP格式错误，IP为：${params}`, '004');
        log('即将使用本地IP地址');
        params = getIp();
    }
    try {
        const content = `export default "${params}";`;
        fs.writeFileSync(path.join(__dirname, `./../config/ip.config.js`), content)
    } catch (e) {
        return reject(`设置IP错误，错误：${e}`)
    }
    return resolve(`设置IP地址 => ${ params }`);
});

// 参数 options
Handle.options = {
    cmd: ['-i', '--ip'],
};

// 成功
Handle.success = (res, next) => {
    log(`${res}`);
    next(res);
};

// 失败
Handle.error = (err, next) => {
    log(err, '004');
    next();
};

export default Handle;

function getIp() {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0;i<iface.length;i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
