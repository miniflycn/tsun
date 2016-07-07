import { Socket } from 'net';
import { ServerRequest } from 'http';
/**
 * combo protobuf
 * @example
 * [
 * 	CourseList({ "type": 168, "ignore": ["*.price"] }),
 * 	UserInfo({ "uin": 0, "need": ["nickname"] })
 * ]
 */
export declare function combo(describe: string, res: Socket, req?: ServerRequest): Promise<void>;
