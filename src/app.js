
import './app.json'
import './sitemap.json'
import './project.config.json'
import './app.scss'
import './wxs/filter.wxs'

import WowApp from 'wow-wx/lib/app'

const wowApp = new WowApp();

const formatKey = (key, cut) => {
    key = key.substring(key.lastIndexOf('/') + 1, key.indexOf(cut));
    return key.substring(0, 1).toUpperCase() + key.substring(1);
};

WowApp.requireDir(require.context('./mixins', true, /\.mixin\.js$/), (key, value) => {
    wowApp.use('mixins', formatKey(key, '.mixin'), value.default || value);
}).requireDir(require.context('wow-wx/mixins', true, /\.mixin\.js$/), (key, value) => {
    wowApp.use('mixins', formatKey(key, '.mixin'), value.default || value);
});

wowApp.init({
    onLaunch(options) {
        console.log('小程序开始加载啦', options);
        console.log('this.wow$ => ', this.wow$);
    },
    onError (msg) {
        console.log('[APP ERROR] => ',msg);
    },
    onPageNotFound () {
        this.wow$.mixins.Router.routerPush('home_index');
    },
});
