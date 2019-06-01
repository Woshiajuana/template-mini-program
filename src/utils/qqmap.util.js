import QQMapWX                      from 'utils/qqmap-wx-jssdk'

class QQMap {
    constructor (options) {
        this.qqmap = new QQMapWX(options);
    }
    reverseGeocoder (options) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.qqmap.reverseGeocoder({
                ...options,
                success: res => {
                    resolve(res);
                },
                fail: err => {
                    reject(err);
                },
            })
        });
    }
}

export default (options = {key: 'DNKBZ-L4XKU-XQHVA-4NZ4U-767TO-G7FYA'}) => {
    return new QQMap(options);
}
