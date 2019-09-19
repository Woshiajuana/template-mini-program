
// import '../utils/es6-promise.util'
import EnvConfig                from 'config/env.config'
import ApiConfig                from 'config/api.config'
import Modal                    from 'wow-wx/plugins/modal.plugin'
import Auth                     from 'wow-wx/plugins/auth.plugin'
import Loading                  from 'wow-wx/plugins/loading.plugin'
import Router                   from 'wow-wx/plugins/router.plugin'

const DEFAULT = {
    method: 'POST',
    useUserId: true,
    data: {},
    useAuth: true,
    useUpLoad: false,
};
class Http {
    constructor (api, data, opt) {
        let options = Object.assign({}, DEFAULT, opt);
        this.method = options.method.toLocaleUpperCase();
        this.data = data;
        this.useUserId = options.useUserId;
        this.useAuth = options.useAuth;
        this.useUpLoad = options.useUpLoad;
        this.url = EnvConfig.API_URL + api;
        return this._fetch();
    }

    _fetch () {
        return new Promise((resolve, reject) => {
            Auth.getToken().then((res) => {
                let {
                    AccessToken,
                    UserID,
                } = res;
                this.useUserId && (this.data.UserId = UserID);
                // this.useUserId && (this.data.Id = UserID);
                this.useAuth && AccessToken && (this.url = `${this.url}?access_token=${AccessToken}`);
            }).catch(() => {}).finally(() => {
                this._log('请求参数', this.data);
                if (this.useAuth && !this.data.UserId) {
                    return Router.root('login_index', {}, true);
                }
                let key = 'request';
                let data = {
                    data: this.data,
                    method: this.method,
                };
                if (this.useUpLoad) {
                    key = 'uploadFile';
                    data = {
                        ...this.data,
                        formData: {
                            UserId: this.data.UserId,
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                    };
                }
                wx[key]({
                    ...data,
                    url: this.url,
                    success: (response) => {
                        let {
                            data,
                            errMsg,
                            statusCode
                        } = response;
                        if (statusCode !== 200 || !data) {
                            return reject(errMsg);
                        }
                        if (this.useUpLoad && typeof data === 'string') {
                            data = JSON.parse(data);
                        }
                        this._log('请求返回', data);
                        let {
                            Status,
                            Message,
                            Data,
                            Id,
                            Extend,
                        } = data;
                        if (Status === 201) {
                            Auth.logout().finally(() => {
                                let pages = getCurrentPages();    //获取加载的页面
                                let first_url = pages[0].route;    //当前页面url
                                let cur_url = pages[pages.length-1].route;    //当前页面url
                                cur_url === 'login_index' ? reject(Message) : Router.root('login_index', {}, true);
                            });
                            return;
                        }
                        if ([301, 302].indexOf(Status) > -1) {
                            return reject(data);
                        }
                        if (Status !== 0) {
                            return reject(Message);
                        }
                        resolve(Data);
                    },
                    fail: (error) => {
                        this._log('请求失败', error);
                        reject(error);
                        Modal.toast(error);
                    }
                });
            });
        })
    }

    _log (str, data) {
        console.log(`${this.url} ${str} => `, data)
    }
}

const fn = (api, data = {}, options = {}) => {
    let {
        loading,
        navLoading,
    } = options;
    let useLoading = typeof loading === 'undefined'
        || loading;
    let useLoadingNav = typeof navLoading === 'undefined'
        || navLoading;
    if (useLoading)
        Loading.show();
    if (useLoadingNav)
        Loading.showNav();
    return new Http(api, data, options).finally(() => {
        if (useLoading)
            Loading.hide();
        if (useLoadingNav)
            Loading.hideNav();
    })
};

fn.API = Object.assign({}, ApiConfig);

export default fn;
