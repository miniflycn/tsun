'use strict';
/**
 * Abstract message protocol
+------------+----------+------------+
|  SXT  | <length> | <data>   | EXT
+------------+----------+------------+
*/
const SXT = 0x2;
const EXT = 0x3;
/**
 * Check `buf`
 */
function check(buf) {
    var off = 0;
    if (buf[off++] !== SXT)
        return false;
    off += buf.readUInt32BE(off) - 2;
    if (buf[off] !== EXT)
        return false;
    return true;
}
exports.check = check;
/**
 * Decode the given `buf`.
 */
function decode(buf) {
    var off = 0, len, msg;
    if (buf[off++] !== SXT)
        throw new Error('Protocol must start with ' + SXT);
    len = buf.readUInt32BE(off);
    off += 4;
    msg = buf.slice(off, off += len - 6);
    if (buf[off] !== EXT)
        throw new Error('Protocol must end with ' + EXT);
    return msg;
}
exports.decode = decode;
;
/**
 * Encode `msg`.
 */
function encode(msg) {
    var off = 0, len = 6 + msg.length, buf = new Buffer(len);
    buf[off++] = SXT;
    buf.writeUInt32BE(len, off);
    off += 4;
    msg.copy(buf, off);
    off += msg.length;
    buf[off] = EXT;
    return buf;
}
exports.encode = encode;
