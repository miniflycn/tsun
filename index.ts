'use strict'
import { Socket } from 'net';
import { ServerRequest } from 'http';
import { ModelConfig, Model } from './model/Base';
import parse from './lib/parse';
import * as cookie from 'cookie';

function createVerify(param: { uin: number, skey: string }): () => Promise<boolean> {
	let hasVerify: boolean;
	return () => {
		return new Promise(function (resolve, reject) {
			if (hasVerify !== undefined) return resolve(hasVerify);
			let code = 0; // auth.PTVerify(param);
			if (code === 0) {
				hasVerify = true;
				resolve(true);
			} else {
				hasVerify = false;
				resolve(false);
			}
		});
	}
}

function _wrap(graph: ModelConfig, i: number, res: Socket, verify: () => Promise<boolean>): Promise<any> {
	try {
		var ChildModel: any = require('./model/' + graph.name).Model;
	} catch(e) {
		console.error(e);
		return undefined;
	}
	return (async function(): Promise<any> {
		let inst = new ChildModel(graph);
		if (
			inst.verify &&
				!(await verify())
		) {
			// need login
			res && res.end(JSON.stringify({ seq: i, code: 100000 }));
		} else {
			let result = await inst.get(graph.param);
			try {
				let data = JSON.stringify({ seq: i, result: result });
				res && res.write(data);
			} catch(e) {
				console.error(e);
			}
		}
	})();
}

function uin(cookies: { [key: string]: string }): number {
	var u = cookies['uin'] || cookies['uid_uin'];
	if (cookies['uid_type'] === '2') {
		return +u;
	}
	return !u ? null : parseInt(u.substring(1, u.length), 10);
}

function skey(cookies: { [key: string]: string }) {
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
export async function combo(describe: string, res: Socket, req?: ServerRequest) {
	let list = parse(describe),
		headers = req.headers || {},
		cookies: { [key: string]: string } = { "uin": '123', "skey": '321' }, // cookie.parse(headers['Cookie']),
		verify = createVerify({ uin: uin(cookies), skey: skey(cookies) }),
		promise,
		promises: Promise<any>[] = [];
	for (var i = 0, l = list.length; i < l; i++) {
		promise = _wrap(list[i], i, res, verify);
		if (promise) promises.push(promise);
	}
	try {
		await Promise.all(promises);
	} catch(e) {
		console.error(e);
	} finally {
		res && res.end();
	}
}