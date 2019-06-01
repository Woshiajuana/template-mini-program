# template-wechat

> Wechat Small program Build

## Author

> Ajuan <979703986@qq.com>

## 目录结构

```
project
├── build                                   // webpack 配置目录
|   ├── component.wow.wx.loader.js          // 组件loader
|   ├── copy.wow.wx.loader.js               // 复制文件loader
|   ├── copy-webpack-plugin.js              // webpack插件示例（未使用）
|   ├── resources.wow.wx.loader.js          // 资源loader
|   ├── webpack.config.js               // 测试环境配置
|   ├── webpack.prod.config.js              // 生产环境配置
├── cmd                                     // node 命令目录
|   ├── cmd.js                              // 命令入口
|   ├── delete.cmd.js                       // 清除某个目录下文件任务模版
|   ├── index.js                            // 命令主入口
|   ├── ip.cmd.js                           // 获取设置IP任务模版
|   ├── page1.cmd.js                         // 生成router.config.js以及app.json任务模版
|   ├── release.cmd.js                      // 发布任务模版
├── config                                  // 配置目录
|   ├── index.js
|   ├── ip.config.js
├── dist                                    // 发布生产
├── node_modules                            // 依赖
├── src                                     // 开发目录
|   ├── assets
|   ├── components
|   ├── config
|   ├── pages
|   ├── plugins
|   ├── tasks
|   ├── utils
|   ├── app.js
|   ├── app.json
|   ├── app.wxss
├── static                                  // 静态资源目录
|   ├── images
├── .babelrc                                // babel 配置文件
├── .editorconfig                           // 代码格式文件
├── .gitignore                              // 忽略文件
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md

```


