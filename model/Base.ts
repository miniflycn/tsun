'use strict'

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
export abstract class Model {
	name: string;
    param: any;
	/**
	 * 是否需要登陸验证
	 */
	verify: boolean;
	
	constructor(config: ModelConfig) {
		this.name = this.constructor.name;
        this.param = config.param;
	}

	/**
	 * get data
	 */
	async get(param: any): Promise<any> {}
}