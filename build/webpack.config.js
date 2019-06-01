
const path = require('path');
const fs = require('fs-extra');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const entry = {};
let walkFun = '';

/**
 * 遍历获取目录结构
 * */
(walkFun = (dir) => {
    dir = dir || '.';
    let directory = path.join(__dirname, '../src', dir);
    fs.readdirSync(directory).forEach((file) => {
        let full_path = path.join(directory, file);
        let dir_arr = full_path.replace(/\\/g, '/').split('\/');
        let name_arr = full_path.substring(full_path.indexOf('src') + 4).replace(/\\/g, '/').split('\/');
        let last_dir = dir_arr[dir_arr.length - 1];
        let stat = fs.statSync(full_path);
        let ext_name = path.extname(full_path);
        if (stat.isFile() && ext_name === '.js') {
            // let page_name = name_arr.join('/');
            let page_name = name_arr.join('/').replace('.js', '');
            if (page_name.indexOf('mixin') === -1)
                entry[page_name] = full_path;
        }
        // else if (stat.isFile() && ext_name === '.wxs') {
        //     let page_name = name_arr.join('/');
        //     // let page_name = name_arr.join('/').replace('.wxs', '');
        //     if (page_name.indexOf('mixin') === -1)
        //         entry[page_name] = full_path;
        // }
        else if (['js','css','img','scss', 'images',
                'image', 'config', 'mixins', 'plugins',
                'services', 'utils', 'tasks'].indexOf(last_dir) === -1 && stat.isDirectory()) {
            let sub_dir = path.join(dir, file);
            walkFun(sub_dir);
        }
    })
})();

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
        path: path.join(__dirname, '../dist')
    },
    resolve: {
        alias: {
            'utils': path.resolve(__dirname, '../src/utils/'),
            'config': path.resolve(__dirname, '../src/config/'),
            'plugins': path.resolve(__dirname, '../src/plugins/'),
            'services': path.resolve(__dirname, '../src/services/'),
            'mixins': path.resolve(__dirname, '../src/mixins/'),
            'tasks': path.resolve(__dirname, '../src/tasks/'),
            'source': path.resolve(__dirname, '../source/'),
            'cmdConfig': path.resolve(__dirname, '../cmd/config'),
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
                ],
            },
            {
                test: /\.wxs(\?[^?]+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: './build/copy.wow.wx.loader.js',
                        options: {
                            output: path.join(__dirname, '../dist'),
                            entry: path.join(__dirname, '../src')
                        }
                    },
                    {
                        loader: './build/resources.wow.wx.loader.js',
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
                        loader: './build/copy.wow.wx.loader.js',
                        options: {
                            output: path.join(__dirname, '../dist'),
                            entry: path.join(__dirname, '../src')
                        }
                    },
                    {
                        loader: './build/resources.wow.wx.loader.js',
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
                        loader: './build/copy.wow.wx.loader.js',
                        options: {
                            output: path.join(__dirname, '../dist'),
                            entry: path.join(__dirname, '../src')
                        }
                    },
                    // {
                    //     loader: './build/component.wow.wx.loader.js',
                    //     options: {
                    //         output: path.join(__dirname, '../dist'),
                    //         entry: path.join(__dirname, '../src')
                    //     }
                    // },
                    {
                        loader: './build/resources.wow.wx.loader.js',
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
