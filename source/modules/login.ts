import { CookieError, CookieErrors } from "../error/CookieError.js";
import { ErrorType, ParsingError } from "../error/ParsingError.js";
import { Cred, Urls } from "../scrapping/common.js";
import { CookieParser, Jar } from "../scrapping/cookieParser.js";
import { Fetch } from "../scrapping/downloader.js";
import { BasicData } from "./student.js";

export type Credentials = {
    user: string;
    password: string;
}

export class Login{
    protected Credentials: Credentials;
    StudentBasics = new BasicData();
    Jar: Jar = new Map();
    Oppened = false;
    private CookieParser: CookieParser = new CookieParser();

    constructor(credentials: Credentials){
        this.Credentials = credentials;
        this.StudentBasics.user = credentials.user;
    }

    private async GetTokens(){
        const req = await Fetch(Urls.SIIAU_HOME_URL, {});
        const tokens = req.$.querySelectorAll('input[type="hidden"]');

        return tokens.map(token => {
            const name = token.getAttribute('name');
            const value = token.getAttribute('value');
            
            if(!name || !value)
                throw "PLACEHOLDER"
            return {name, value} 
        })
    }

    private makeBody(tokens: {name: string, value: string}[]){
        const Credentials = this.Credentials;
        const UrlParams = new URLSearchParams({
            'p_codigo_c': this.Credentials.user,
            'p_clave_c': this.Credentials.password
        }); 
        // if(tokens.length !== 5)
        //     throw "PLACEHOLDER";

        tokens.forEach(tkn => {UrlParams.append(tkn.name, tkn.value)});
        return UrlParams.toString();
    }

    private async StepOne(){
        const tokens = await this.GetTokens();
        const body = this.makeBody(tokens);

        const req = await Fetch(Urls.SIIAU_LOGINS1, {
            method: "POST",
            body,
        });

        const inputs = req.$.querySelectorAll('input');
    }

    private async StepTwo(){
        const body = Cred({
            'p_codigo_c': this.Credentials.user,
            'p_clave_c': this.Credentials.password
        });
        
        const req = await Fetch(Urls.SIIAU_LOGIN2, {
            method: "POST",
            body
        })
        const $form = req.$.querySelector('form[name="mainPage"]');
        if(!$form)
            throw new ParsingError(ErrorType.Element);
        const $pid = $form.querySelector('input[name="p_pidm_n"]');
        if(!$pid)    
            throw new ParsingError(ErrorType.Element);
        const pid = $pid.getAttribute('value');
        if (!pid)
            throw new ParsingError(ErrorType.Attribute);
        const cookies = req.headers.getSetCookie();
        this.StudentBasics.pid = pid;
        this.CookieParser.parse(cookies, this.Jar);
    }

    private async GetCarrera(){
        if(this.Jar.size == 0)
            throw new CookieError(CookieErrors.NOTCOOKIES);
        const req = await Fetch(Urls.SIIAU_GETCARRERA, {}, this.Jar);
        const $boleta = req.$.querySelector('a[target="Contenido"]');
        if(!$boleta)
            throw new ParsingError(ErrorType.Element);
        const Carrera = $boleta.getAttribute('href');
        if(!Carrera)
            throw new ParsingError(ErrorType.Attribute);
        return Carrera.split('majrp=')[1];
    }
    async LogOut(): Promise<void>{
        try{
            if(this.Jar.size == 0)
                throw new CookieError(CookieErrors.NOTCOOKIES);
            const req = await Fetch(Urls.SIIAU_LOGOUT, {}, this.Jar);
            this.CookieParser.clearJar(this.Jar);

            this.Oppened = false;
        }
        catch(err){
            throw new ParsingError(ErrorType.Invalid)
        }
    }

    async LogIn(): Promise<boolean>{
        try{
            await this.StepOne.bind(this)();
            await this.StepTwo.bind(this)();    
            this.StudentBasics.carrera = await this.GetCarrera();
            this.Oppened = true;
            return true;
        }catch(err){
            throw err;
        }
    }
}