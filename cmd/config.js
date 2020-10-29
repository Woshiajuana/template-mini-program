
// 整个打包项目的配置文件 该配置只在打包的时候参与作用 不会打包进入实际业务代码

const cmdPath = process.cwd();
const path = require('path');
const ip = (() => {
    let interfaces = require('os').networkInterfaces();
    for(let devName in interfaces){
        let iface = interfaces[devName];
        for(let i=0; i < iface.length; i++){
            let alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
})();

const port = '32580';

// directory 配置
const directoryConfig = {
    // 根目录遍历(开发目录最好不要改不然很多配置都得改)
    rootDirectoryPath: '/src/',
    // 排除遍历的目录
    excludeDirectory: [
        'assets',
        'wxs',
        'config',
        'mixins',
        'plugins',
        'utils',
    ],
    // 遍历文件的后缀名
    includeExtName: [ '.js', '.wxs'],
    // 输出根目录(完全可以改)
    rootOutputPath: '/dist/',
};

// App 配置
const applicationConfig = {
    // APPID
    wow: {
        app: 'wow-wx',
        // app名称
        name: 'wow-wx',
        // 版本
        version: '0.0.1',
        // 发布
        release: {
            // 本地
            dev: {
                // 环境
                env: {
                    path: path.join(cmdPath, '/src/config'),
                    filename: 'env.config.js',
                    prompt: '本地环境、资源配置',
                    config: {
                        STATIC_URL: `http://${ip}:${port}/static/`,
                        API_URL: 'https://xcx.owulia.com/',
                    },
                },
            },
            // 测试
            test: {
                // 环境
                env: {
                    path: path.join(cmdPath, '/src/config'),
                    filename: 'env.config.js',
                    prompt: '本地环境、资源配置',
                    config: {
                        STATIC_URL: `http://${ip}:${port}/static/`,
                        API_URL: 'https://xcx.owulia.com/',
                    },
                },
            },
            // 生产
            build: {
                // 环境
                env: {
                    path: path.join(cmdPath, '/src/config'),
                    filename: 'env.config.js',
                    prompt: '本地环境、资源配置',
                    config: {
                        STATIC_URL: `http://${ip}:${port}/static/`,
                        API_URL: 'https://xcx.owulia.com/',
                    },
                },
            },
        },
    },
};

module.exports = {
    ip,
    port,
    directoryConfig,
    applicationConfig,
};
