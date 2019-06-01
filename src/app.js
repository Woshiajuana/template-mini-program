import './project.config.json'
import './app.json'
import './app.scss'
import './wxs/filter.wxs'

import WowApp                       from 'wow-wx'

let files = require.context('./mixins', false, /.js$/);
files.keys().forEach((key) => {
    let newKey = key.substring(2, key.indexOf('.mixin'));
    WowApp.use('mixins', newKey, files(key).default);
});

WowApp({
    mixins: [
        WowApp.wow$.mixins.text,
    ],
    onLaunch () {
        // console.log(this.setData({text:2}))
        console.log('app => ', this.data.text);
        // this.setData({text:2})
        // console.log('app => ', this.data.text);
    },
    onShow () {
        setTimeout(() => {
            console.log('app => ', this.data.text);
        }, 5000);
    },
});
