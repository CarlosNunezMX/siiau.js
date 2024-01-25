export declare enum CookieErrors {
    NOTCOOKIES = "Cookies not found in the jar."
}
export declare class CookieError extends Error {
    constructor(message: CookieErrors);
}
