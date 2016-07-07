import { Model as Base } from './Base';
export declare class Model extends Base {
    name: string;
    constructor(param?: {});
    get(param: any): Promise<UserInfo>;
}
export interface UserInfo {
    /**
     * 用户名
     */
    nickname: string;
}
