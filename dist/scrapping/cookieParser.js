"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieParser = void 0;
class CookieParser {
    parse(cookies, jar) {
        let parsed_cookies = jar ?? new Map();
        cookies.map(cookie => cookie.split(';')[0])
            .map(cookie => cookie.split('='))
            .forEach(([name, value]) => parsed_cookies.set(name, value));
        return parsed_cookies;
    }
    stringify(jar) {
        let str = '';
        for (const [key, value] of jar) {
            str += `${key}=${value}; `;
        }
        return str;
    }
    clearJar(jar) {
        for (const [key] of jar) {
            jar.delete(key);
        }
    }
}
exports.CookieParser = CookieParser;
