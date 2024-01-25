import type { HTMLElement } from 'node-html-parser';
import { Urls } from './common.js';
import { Jar } from './cookieParser.js';
export interface FetchResponse extends Response {
    $: HTMLElement;
}
export declare function Fetch(url: Urls | string, req: RequestInit, Cookies?: Jar): Promise<FetchResponse>;
