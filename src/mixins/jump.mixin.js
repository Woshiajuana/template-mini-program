
export default {
    handleJump (event) {
        let { url, params = {} } = event.currentTarget.dataset;
        this.routerPush(url, params);
    },
    handleRoot (event) {
        let { url, params = {} } = event.currentTarget.dataset;
        this.routerRoot(url, params);
    },
}
