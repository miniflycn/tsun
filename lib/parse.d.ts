import { ModelConfig } from '../model/Base';
/**
 * parse describe
 * @example
 * `[Question({ "qid": 5212364 })]` => [{ name: 'Question', param: { qid: 5212364 } }]
 * @example
 */
export default function parse(describe: string): ModelConfig[];
