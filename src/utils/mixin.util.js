
import './es6-promise.util'

export default (options) => {
    let {
        data,
        mixins,
    } = options;
    if (!mixins)
        return options;
    delete options.mixins;
    if (!data) data = {};
    mixins.forEach((item) => {
        if (item.data)
            Object.assign(data, item.data);
        delete item.data;
        Object.assign(options, item);
    });
    options.data = data;
    return options;
}
