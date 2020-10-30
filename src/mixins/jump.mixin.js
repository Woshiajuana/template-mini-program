
import InputMixin from 'wow-wx/mixins/wx/input.mixin'
import RouterMixin from 'wow-wx/mixins/wx/router.mixin'

export default {
    mixins: [
        InputMixin,
        RouterMixin,
    ],
    jumpPageOrFireFn (e) {
        let { url, params, fn, item, async, sync, disabled, close = false, event, filter } = this.inputParams(e);
        if (disabled) {
            return null;
        }
        if (typeof item === 'object') {
            let { url: itemUrl, fn: itemFn, params: itemParams, event: itemEvent, filter: itemFilter } = item;
            if (itemUrl) {
                url = itemUrl;
            }
            if (itemFn) {
                fn = itemFn
            }
            if (itemParams) {
                params = itemParams;
            }
            if (itemEvent) {
                event = itemEvent
            }
            if (itemFilter) {
                filter = itemFilter
            }
        }
        // 过滤拦截器
        if (filter) {
            filter = filter.split(',');
            for (let i = 0, len = filter.length; i < len; i++) {
                let result = this[filter[i]](params || item);
                if (result) {
                    return true;
                }
            }
        }
        const fireFn = () => {
            if (url) {
                this.routerPush(url, params || item, !!close);
            }
            if (fn && this[fn]) {
                this[fn](params || item);
            }
            if (event) {
                this.triggerEvent(event, params || item)
            }
        };
        if (typeof sync !== 'undefined' && !sync) {
            return this.routerPush('login_index');
        }
        if (async) {
            return this.userGet().then(() => {
                fireFn();
            }).catch((err) => {
                console.log(err);
                this.routerPush('login_index');
            });
        }
        fireFn();
    },
}
