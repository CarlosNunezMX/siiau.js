export declare enum SessionErrors {
    NotLogged = "Session is not started."
}
export declare class SessionError extends Error {
    constructor(message: SessionErrors);
}
