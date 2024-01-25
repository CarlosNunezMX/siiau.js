export enum CookieErrors {
    NOTCOOKIES = "Cookies not found in the jar."
}

export class CookieError extends Error{
    constructor(message: CookieErrors){
        super(message);
        this.message = message;
    }
}