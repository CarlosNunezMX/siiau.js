"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieError = exports.CookieErrors = void 0;
var CookieErrors;
(function (CookieErrors) {
    CookieErrors["NOTCOOKIES"] = "Cookies not found in the jar.";
})(CookieErrors || (exports.CookieErrors = CookieErrors = {}));
class CookieError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.CookieError = CookieError;
