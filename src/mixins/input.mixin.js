
const handle = function (e) {
    let {
        detail,
        currentTarget
    } = e;
    let key = currentTarget.dataset.key;
    let obj = currentTarget.dataset.obj;
    let value = typeof detail.value === 'undefined' ?
        currentTarget.dataset.value : detail.value;
    if (obj) {
        let sItem = `${obj}.${key}.value`;
        this.setData({
            [sItem]: value
        });
    } else {
        this.setData({
            [key]: value
        });
    }

};

export default {
    bindInput (event) {
        let { detail, currentTarget } = event;
        let { item, value } = currentTarget.dataset;
        if (typeof value === 'undefined') value = detail.value;
        this.setData({
            [`${item.key}.value`]: value,
        });
        this.inputCallback && this.inputCallback(item, value);
    },
    bindTap: handle,
    bindChange: handle,
}
