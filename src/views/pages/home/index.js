//index.js
import './index.json'
import './index.scss'
import './index.wxml'

import WowPage from 'wow-wx/lib/page'

new WowPage({
    mixins: [
        WowPage.wow$.mixins.Jump,
    ],
    onLoad (options) {

    },
});
