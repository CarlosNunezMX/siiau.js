export enum ErrorType{
    Attribute = "Mising Attribute.",
    Element = "Mising Element",
    Invalid = "Invalid Request or Response"
}
const Message = "Error while html siiau response was readed.";
export class ParsingError extends Error{
    Type: ErrorType;
    constructor(type: ErrorType){
        super(Message);
        this.message = Message;
        this.Type = type;
    }
}