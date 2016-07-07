'use strict';
const Base = require('./Base');
/**
 * UserInfo Model
 */
class Model extends Base.Model {
    constructor(param) {
        const para = Object.assign({ name: 'UserInfo' }, param);
        super(para);
    }
    get(param) {
        return new Promise(function (resolve, reject) {
            let res = param.uin === 0 ? '皑雪' : '猜猜我是谁';
            setTimeout(() => {
                resolve({ nickname: res });
            }, Math.random() * 1000 | 0);
        });
    }
}
exports.Model = Model;
