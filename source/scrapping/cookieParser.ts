export type Jar = Map<string, string>

export class CookieParser{
    parse(cookies: string[], jar?: Jar){
        let parsed_cookies: Jar = jar ?? new Map();
        cookies.map(cookie => cookie.split(';')[0])
            .map(cookie => cookie.split('='))
            .forEach(([name, value]) => parsed_cookies.set(name, value));
        return parsed_cookies
    }

    stringify(jar: Jar){
        let str = '';
        for (const [key, value] of jar){
            str += `${key}=${value}; `;
        }
        return str;
    }

    clearJar(jar: Jar){
        for(const [key] of jar){
            jar.delete(key);
        }
    }
}