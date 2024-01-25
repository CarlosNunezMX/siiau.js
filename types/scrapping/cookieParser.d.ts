export type Jar = Map<string, string>;
export declare class CookieParser {
    parse(cookies: string[], jar?: Jar): Jar;
    stringify(jar: Jar): string;
    clearJar(jar: Jar): void;
}
