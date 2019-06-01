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
files = require.context('./config', false, /.js$/);
files.keys().forEach((key) => {
    let newKey = key.substring(2, key.indexOf('.config'));
    WowApp.use('config', newKey, files(key).default);
});

WowApp({
    mixins: [
        WowApp.wow$.mixins.text,
    ],
});
