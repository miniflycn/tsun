'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const parse_1 = require('./lib/parse');
function createVerify(param) {
    let hasVerify;
    return () => {
        return new Promise(function (resolve, reject) {
            if (hasVerify !== undefined)
                return resolve(hasVerify);
            let code = 0; // auth.PTVerify(param);
            if (code === 0) {
                hasVerify = true;
                resolve(true);
            }
            else {
                hasVerify = false;
                resolve(false);
            }
        });
    };
}
function _wrap(graph, i, res, verify) {
    try {
        var ChildModel = require('./model/' + graph.name).Model;
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
    return (function () {
        return __awaiter(this, void 0, Promise, function* () {
            let inst = new ChildModel(graph);
            if (inst.verify &&
                !(yield verify())) {
                // need login
                res && res.end(JSON.stringify({ seq: i, code: 100000 }));
            }
            else {
                let result = yield inst.get(graph.param);
                try {
                    let data = JSON.stringify({ seq: i, result: result });
                    res && res.write(data);
                }
                catch (e) {
                    console.error(e);
                }
            }
        });
    })();
}
function uin(cookies) {
    var u = cookies['uin'] || cookies['uid_uin'];
    if (cookies['uid_type'] === '2') {
        return +u;
    }
    return !u ? null : parseInt(u.substring(1, u.length), 10);
}
function skey(cookies) {
    return cookies['skey'];
}
/**
 * combo protobuf
 * @example
 * [
 * 	CourseList({ "type": 168, "ignore": ["*.price"] }),
 * 	UserInfo({ "uin": 0, "need": ["nickname"] })
 * ]
 */
function combo(describe, res, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let list = parse_1.default(describe), headers = req.headers || {}, cookies = { "uin": '123', "skey": '321' }, // cookie.parse(headers['Cookie']),
        verify = createVerify({ uin: uin(cookies), skey: skey(cookies) }), promise, promises = [];
        for (var i = 0, l = list.length; i < l; i++) {
            promise = _wrap(list[i], i, res, verify);
            if (promise)
                promises.push(promise);
        }
        try {
            yield Promise.all(promises);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            res && res.end();
        }
    });
}
exports.combo = combo;
