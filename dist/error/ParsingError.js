"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingError = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["Attribute"] = "Mising Attribute.";
    ErrorType["Element"] = "Mising Element";
    ErrorType["Invalid"] = "Invalid Request or Response";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
const Message = "Error while html siiau response was readed.";
class ParsingError extends Error {
    Type;
    constructor(type) {
        super(Message);
        this.message = Message;
        this.Type = type;
    }
}
exports.ParsingError = ParsingError;
