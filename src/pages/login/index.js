//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage                      from 'wow-wx/lib/page'

WowPage({
    mixins: [
        WowPage.wow$.mixins.version,
    ],
    data: {
        title: '登录'
    },
    onShow () {
        console.log(this.wow$)
        console.log('page => ', this.data.text)
        this.setData({text: 2});
        console.log('page => ', this.data.text)
    }
});

