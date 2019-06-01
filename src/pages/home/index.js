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
        hello: 'Hello World'
    },
    handleLogin () {
        this.wow$.plugins.router.push('login_index');
    },
});

