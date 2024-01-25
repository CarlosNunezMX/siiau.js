"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch = void 0;
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const common_js_1 = require("./common.js");
const node_buffer_1 = require("node:buffer");
const he_1 = __importDefault(require("he"));
const cookieParser_js_1 = require("./cookieParser.js");
;
async function Fetch(url, req, Cookies) {
    const $req = await fetch(url, {
        ...req,
        headers: {
            Cookie: !!Cookies ? new cookieParser_js_1.CookieParser().stringify(Cookies) : '',
            ...common_js_1.CommonHeaders,
            ...req.headers,
            "Content-Type": 'text/html; charset=utf-8'
        }
    });
    const responseText = await $req.text();
    let textParsed = iconv_lite_1.default.decode(node_buffer_1.Buffer.from(responseText, 'binary'), "ISO-8859-1");
    // @ts-ignore
    let final = $req;
    final.$ = node_html_parser_1.default.parse(he_1.default.decode(textParsed));
    return final;
}
exports.Fetch = Fetch;
