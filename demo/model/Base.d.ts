export interface ModelConfig {
    /**
     * Model名称
     */
    name: string;
    /**
     * 参数
     */
    param: any;
}
/**
 * Model抽象基类
 */
export declare abstract class Model {
    name: string;
    param: any;
    /**
     * 是否需要登陸验证
     */
    verify: boolean;
    constructor(config: ModelConfig);
    /**
     * get data
     */
    get(param: any): Promise<any>;
}
