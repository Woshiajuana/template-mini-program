
const path = require('path');
const fs = require('fs-extra');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const output = require('wow-cmd').output;
const cmdPath = process.cwd();
const { directoryConfig } = require('./config');
const { name, env, err } = require('./cmdParams.json');

if (err) {
    throw '无法打包，环境配置发布有误，请检查无误之后再打包';
}

output.info('webpack.config.js=>', `即将开始【app: ${name} 】【环境: ${env}】打包`);

let entry = {};
const {
    rootDirectoryPath,
    excludeDirectory,
    includeExtName,
    rootOutputPath,
} = directoryConfig;
const rootDirectoryAbsolutePath = path.join(cmdPath, rootDirectoryPath);
const rootOutDirectoryAbsolutePath = path.join(cmdPath, rootOutputPath);
;(function walkFun (directory) {
    fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.join(directory, file);
        const fileStat = fs.statSync(fullPath);
        const fileExtName = path.extname(fullPath);
        const fileDirArr = (path.join(directory, path.basename(fullPath, fileExtName))).replace(rootDirectoryAbsolutePath, '').replace(/\\/g, '/').split('\/');
        const fileLastDir = fileDirArr[fileDirArr.length - 1];
        if (fileStat.isFile() && includeExtName.indexOf(fileExtName) > -1) {
            if (fileDirArr[0] === 'views') {
                fileDirArr.shift();
            }
            let name = fileDirArr.join('/').replace('.js', '');
            if (name.indexOf('mixin') === -1) {
                entry[name] = fullPath;
            }
        } else if (fileStat.isDirectory() && excludeDirectory.indexOf(fileLastDir) === -1) {
            walkFun(fullPath);
        }
    });
})(rootDirectoryAbsolutePath);

let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
    }
});

const config = {
    entry: entry,
    output: {
        filename: '[name].js',
        path: rootOutDirectoryAbsolutePath,
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../src/'),
            'source': path.resolve(__dirname, '../source/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js(\?[^?]+)?$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, '../node_modules/wow-wx'),
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../source'),
                ],
            },
            {
                test: /\.wxs(\?[^?]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: './cmd/copy.wow.wx.loader.js',
                        options: {
                            output: rootOutDirectoryAbsolutePath,
                            entry: rootDirectoryAbsolutePath,
                        }
                    },
                    {
                        loader: './cmd/resources.wow.wx.loader.js',
                        options: {
                            use_source: true,
                            use_image: false,
                            use_filter: [],
                        }
                    },
                ]
            },
            //处理css文件
            {
                test: /\.wxss/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            },
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options:{
                            minimize: true //css压缩
                        },
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            {
                test: /\.wxml/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: './cmd/copy.wow.wx.loader.js',
                        options: {
                            output: rootOutDirectoryAbsolutePath,
                            entry: rootDirectoryAbsolutePath,
                        }
                    },
                    {
                        loader: './cmd/resources.wow.wx.loader.js',
                        options: {
                            use_source: true,
                            use_image: true,
                            use_filter: [],
                        }
                    },
                ]
            },
            {
                test: /\.json/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: './cmd/copy.wow.wx.loader.js',
                        options: {
                            output: rootOutDirectoryAbsolutePath,
                            entry: rootDirectoryAbsolutePath,
                        }
                    },
                    {
                        loader: './cmd/resources.wow.wx.loader.js',
                        options: {
                            use_source: true,
                            use_image: false,
                            use_filter: [],
                        }
                    },
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: './cmd/copy.wow.wx.loader.js',
                        options: {
                            output: rootOutDirectoryAbsolutePath,
                            entry: rootDirectoryAbsolutePath,
                        }
                    },
                    {
                        loader: './cmd/resources.wow.wx.loader.js',
                        options: {
                            use_source: true,
                            use_image: false,
                            use_filter: [],
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: './cmd/copy.wow.wx.loader.js',
                        options: {
                            output: rootOutDirectoryAbsolutePath,
                            entry: rootDirectoryAbsolutePath,
                        }
                    },
                    {
                        loader: './cmd/resources.wow.wx.loader.js',
                        options: {
                            use_source: true,
                            use_image: false,
                            use_filter: [],
                        }
                    },
                ]
            },
        ]
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        uglifyJsPlugin,
        new ExtractTextPlugin('[name].wxss'),
    ]
};

module.exports = config;
