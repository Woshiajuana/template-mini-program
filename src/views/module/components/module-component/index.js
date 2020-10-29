import './index.json'
import './index.wxml'
import './index.scss'

import WowComponent from 'wow-wx/lib/component'

new WowComponent({
    mixins: [
        WowComponent.wow$.mixins.Jump,
    ],
    externalClasses: ['class-external'],
    options: {
        multipleSlots: true,
        addGlobalClass: true,
    },
    properties: {},
});
