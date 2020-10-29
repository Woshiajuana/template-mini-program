
import routes from 'src/config/router.config'

export default {
    routes,
    modalFormatMsg (options) {
        return options.errMsg || options.msg || options.message || JSON.stringify(options);
    },
}
