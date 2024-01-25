import { Jar } from "../scrapping/cookieParser.js";
import { BasicData } from "./student.js";
export type Credentials = {
    user: string;
    password: string;
};
export declare class Login {
    protected Credentials: Credentials;
    StudentBasics: BasicData;
    Jar: Jar;
    Oppened: boolean;
    private CookieParser;
    constructor(credentials: Credentials);
    private GetTokens;
    private makeBody;
    private StepOne;
    private StepTwo;
    private GetCarrera;
    LogOut(): Promise<void>;
    LogIn(): Promise<boolean>;
}
