// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/cookie/cookie.d.ts
interface CookieSerializeOptions {
    encode?: (val: string) => string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
}

interface CookieParseOptions {
    decode?: (val: string) => string;
}

interface CookieStatic {
    serialize(name: string, val: string, options?: CookieSerializeOptions): string;
    parse(str: string, options?: CookieParseOptions): { [key: string]: string };
}

declare module "cookie" {
    var cookie: CookieStatic;
    export = cookie;
}