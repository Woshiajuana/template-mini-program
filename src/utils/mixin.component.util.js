
import './es6-promise.util'

export default (options) => {
    let {
        mixins,
        data,
        methods,
    } = options;
    if (!mixins)
        return options;
    delete options.mixins;
    if (!data) data = {};
    if (!methods) methods = {};
    mixins.forEach((item) => {
        if (item.data)
            Object.assign(data, item.data);
        delete item.data;
        Object.assign(methods, item);
    });
    options.methods = methods;
    options.data = data;
    return options;
}
