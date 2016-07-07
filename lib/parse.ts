'use strict'
import { ModelConfig } from '../model/Base';

var tokens = [
	[/^\s+/, 'SPACE'],
	[/^{/, 'PARAM'],
	[/^(\w+)\(/, 'NAME'],
	[/^\)/, 'BRACKET'],
	[/^,/, 'COMMA']
];

function _makeParam(str: string): { param: any, length: number } {
	let param: any,
		layer = 1,
		inStr: string = undefined,
		i = 1, l = str.length,
		s: string;
	for (; i < l && layer !== 0; i++) {
		s = str.charAt(i);
		if (s === '"' || s === '"') {
			// not in string
			if (inStr && s === inStr) {
				inStr = undefined;
			} else if (!inStr) {
				inStr = s;
			}
		} else if (s === '{' && !inStr) {
			layer += 1;
		} else if (s === '}' && !inStr) {
			layer -= 1;
		}
	}
	try {
		param = JSON.parse(str.substr(0, i));
	} catch(e) {
		throw new Error(`Description's param syntax error in: ${str}`);
	}
	return {
		param: param,
		length: i
	};
}

function _parse(describe: string, index: number, res: ModelConfig[], pass?: string) {
	let len: number, match;
	mark: for (let i = 0, l = tokens.length; i < l; i++) {
		match = (<RegExp>tokens[i][0]).exec(describe);
		if (match) {
			switch (<string>tokens[i][1]) {
				case 'NAME':
					pass = match[1];
				case 'SPACE':
				case 'COMMA':
				case 'BRACKET':
					len = match[0].length;
					index += len;
					break mark;
				case 'PARAM':
					if (!pass) throw new Error(`Unexpect token in the description.${index}: ${describe}`);
					let tmp = _makeParam(describe);
					res.push({
						name: pass,
						param: tmp.param
					});
					len = tmp.length;
					index += len;
					pass = undefined;
					break mark;
			}
		}
		
	}
	if (!match) throw new Error(`Unexpect token in the description.${index}: ${describe}`);
	describe = describe.substr(len);
	describe.length && _parse(describe, index, res, pass);
}

/**
 * parse describe
 * @example 
 * `[Question({ "qid": 5212364 })]` => [{ name: 'Question', param: { qid: 5212364 } }]
 * @example
 */
export default function parse(describe: string): ModelConfig[] {
	describe = describe.trim();
	if (!describe.startsWith('[')) throw new Error('Description must start with [');
	if (!describe.endsWith(']')) throw new Error('Description must end with ]');
	describe = describe.substr(1, describe.length - 2);
	let res: ModelConfig[] = [];
	_parse(describe, 1, res);
	return res;
}