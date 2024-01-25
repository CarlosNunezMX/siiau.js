import type {HTMLElement} from 'node-html-parser';

import parser from 'node-html-parser';
import incov from 'iconv-lite';
import { Urls, CommonHeaders } from './common.js';
import {Buffer} from "node:buffer"
import he from 'he';
import { CookieParser, Jar } from './cookieParser.js';

export interface FetchResponse extends Response{
    $: HTMLElement
};

export async function Fetch(url: Urls | string, req: RequestInit, Cookies?: Jar){
    const $req = await fetch(url, {
        ...req,
        headers: {
            Cookie: !!Cookies ? new CookieParser().stringify(Cookies) : '',
            ...CommonHeaders,
            ...req.headers,
            "Content-Type": 'text/html; charset=utf-8'
        }
    });
    const responseText = await $req.text();
    let textParsed = incov.decode(
        Buffer.from(responseText, 'binary'),
        "ISO-8859-1"
    );
    // @ts-ignore
    let final: FetchResponse = $req;
    final.$ = parser.parse(he.decode(textParsed));
    return final;
}