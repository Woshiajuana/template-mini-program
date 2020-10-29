
const fs = require('fs-extra');
const path = require('path');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();

const Handle = (options, data, next) => {
    let {
        params,
    } = options;
    params = params ? params.toLocaleLowerCase() : '';
    try {
        if (!params)
            throw '未指定设置发布参数';
        output.success('release.cmd=>', `指定发布参数【${params}】`);

        const {
            app,
            env,
        } = params = ((params) => {
            let objParams = {};
            params.split('::').forEach((param) => {
                let [key, value] = param.split('=');
                if (key, value)
                    objParams[key] = value;
            });
            return objParams;
        })(params);
        if (!app)
            throw '未指定发布app';
        output.success('release.cmd=>', `指定发布app【${app}】`);
        if (!env)
            throw '未指定发布env';
        output.success('release.cmd=>', `指定发布env【${env}】`);

        const {
            applicationConfig,
        } = require('./config');
        const application = applicationConfig[app];
        if (!application)
            throw `applicationConfig无【${app}】应用配置`;
        const {
            release,
        } = application;
        delete application.release;
        const releaseEnvs = release[env];
        if (!releaseEnvs)
            throw `【${app}】应用配置无【${env}】环境配置`;

        ;((releaseEnvs) => {
            for (let key in releaseEnvs) {
                const relEnv = releaseEnvs[key];
                if (typeof relEnv === 'object') {
                    delete releaseEnvs[key];
                    let {
                        path,
                        filename,
                        config,
                        prompt,
                    } = relEnv;
                    if (path && filename && config) {
                        if (typeof config !== 'string')
                            config = JSON.stringify(config, null, 4);
                        fs.ensureDirSync(path);
                        fs.writeFileSync(`${path}/${filename}`, `export default ${config}`);
                        output.success('release.cmd=>', `${prompt || key}配置【${config}】`);
                    }
                }
            }
        })(releaseEnvs);
        fs.writeFileSync(path.join(cmdPath, '/cmd/cmdParams.json'), JSON.stringify({
            app,
            env,
            name: application.name,
        }, null, 4));
        output.success('release.cmd=>', `配置 生成 tree.json 成功`);
    } catch (e) {
        output.error('release.cmd=>', `发布app错误：${e}`);
        fs.writeFileSync(path.join(cmdPath, '/cmd/cmdParams.json'), JSON.stringify({ err: true }, null, 4));
    } finally {
        next();
    }
};

// 参数 options
Handle.options = {
    cmd: ['-r', '--release'],
};

module.exports = Handle;
