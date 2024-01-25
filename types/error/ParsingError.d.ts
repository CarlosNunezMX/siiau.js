export declare enum ErrorType {
    Attribute = "Mising Attribute.",
    Element = "Mising Element",
    Invalid = "Invalid Request or Response"
}
export declare class ParsingError extends Error {
    Type: ErrorType;
    constructor(type: ErrorType);
}
