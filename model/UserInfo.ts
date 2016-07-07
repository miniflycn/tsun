'use strict'
import * as Base from './Base';

/**
 * UserInfo Model
 */
export class Model extends Base.Model {
	constructor(param) {
        const para = Object.assign({ name: 'UserInfo' }, param);
		super(para);
	}
	
	get(param: any): Promise<UserInfo> {
		return new Promise(function (resolve, reject) {
			let res = param.uin === 0 ? '皑雪' : '猜猜我是谁';
			setTimeout(() => {
				resolve({ nickname: res });
			}, Math.random() * 1000 | 0);
		});
	}
}

/**
 * UserInfo
 */
export interface UserInfo {
	/**
	 * 用户名
	 */
	nickname: string
}