"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionError = exports.SessionErrors = void 0;
var SessionErrors;
(function (SessionErrors) {
    SessionErrors["NotLogged"] = "Session is not started.";
})(SessionErrors || (exports.SessionErrors = SessionErrors = {}));
class SessionError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.SessionError = SessionError;
