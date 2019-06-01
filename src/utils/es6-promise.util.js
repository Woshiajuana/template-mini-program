import Modal from 'plugins/modal.plugin'

Promise.prototype.toast = function () {
    return this.catch(err => {
        Modal.toast(err);
    });
};

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    );
};
