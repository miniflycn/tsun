'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Model抽象基类
 */
class Model {
    constructor(config) {
        this.name = this.constructor.name;
        this.param = config.param;
    }
    /**
     * get data
     */
    get(param) {
        return __awaiter(this, void 0, Promise, function* () { });
    }
}
exports.Model = Model;
