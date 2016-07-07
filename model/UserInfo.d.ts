import * as Base from './Base';
/**
 * UserInfo Model
 */
export declare class Model extends Base.Model {
    constructor(param: any);
    get(param: any): Promise<UserInfo>;
}
/**
 * UserInfo
 */
export interface UserInfo {
    /**
     * 用户名
     */
    nickname: string;
}
