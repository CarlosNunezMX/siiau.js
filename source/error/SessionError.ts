export enum SessionErrors {
    NotLogged = "Session is not started."
}

export class SessionError extends Error{
    constructor(message: SessionErrors){
        super(message);
        this.message = message;
    }
}