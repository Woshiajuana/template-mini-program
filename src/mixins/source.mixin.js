
import Source                   from 'utils/source.util'

export default {
    data: {
        src$: {},
    },
    sourceGet (arr = []) {
        let src$ = this.data.src$;
        arr.forEach((item) => {
            let { key, value, use } = item;
            src$[key] = use !== false ? Source(value) : value;
        });
        this.setData({ src$ })
    },
}
