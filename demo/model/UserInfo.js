"use strict";
const Base_1 = require('./Base');
class Model extends Base_1.Model {
    constructor(param = {}) {
        const options = Object.assign({ name: 'UserInfo' }, param);
        super(options);
    }
    get(param) {
        return new Promise((resolve) => {
            DB.send(this.name, param, (data) => {
                resolve(data);
            });
        });
    }
}
exports.Model = Model;
