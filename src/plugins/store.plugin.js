export default {
    get: (key) => new Promise((resolve, reject) => {
        let value = wx.getStorageSync(key);
        if (typeof value !== 'undefined' && value !== '' && value !== ' ') resolve(value);
        else reject({errCode: -999, errMsg: `${key} is undefined`});
    }),
    set: (key, value) => new Promise((resolve, reject) => {
        wx.setStorageSync(key, value);
        return resolve(value);
    }),
    remove: (key) => new Promise((resolve, reject) => {
        wx.removeStorageSync(key);
        return resolve();
    }),
}
