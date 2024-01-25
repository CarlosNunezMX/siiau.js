"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const CookieError_js_1 = require("../error/CookieError.js");
const ParsingError_js_1 = require("../error/ParsingError.js");
const common_js_1 = require("../scrapping/common.js");
const cookieParser_js_1 = require("../scrapping/cookieParser.js");
const downloader_js_1 = require("../scrapping/downloader.js");
const student_js_1 = require("./student.js");
class Login {
    Credentials;
    StudentBasics = new student_js_1.BasicData();
    Jar = new Map();
    Oppened = false;
    CookieParser = new cookieParser_js_1.CookieParser();
    constructor(credentials) {
        this.Credentials = credentials;
        this.StudentBasics.user = credentials.user;
    }
    async GetTokens() {
        const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_HOME_URL, {});
        const tokens = req.$.querySelectorAll('input[type="hidden"]');
        return tokens.map(token => {
            const name = token.getAttribute('name');
            const value = token.getAttribute('value');
            if (!name || !value)
                throw "PLACEHOLDER";
            return { name, value };
        });
    }
    makeBody(tokens) {
        const Credentials = this.Credentials;
        const UrlParams = new URLSearchParams({
            'p_codigo_c': this.Credentials.user,
            'p_clave_c': this.Credentials.password
        });
        // if(tokens.length !== 5)
        //     throw "PLACEHOLDER";
        tokens.forEach(tkn => { UrlParams.append(tkn.name, tkn.value); });
        return UrlParams.toString();
    }
    async StepOne() {
        const tokens = await this.GetTokens();
        const body = this.makeBody(tokens);
        const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_LOGINS1, {
            method: "POST",
            body,
        });
        const inputs = req.$.querySelectorAll('input');
    }
    async StepTwo() {
        const body = (0, common_js_1.Cred)({
            'p_codigo_c': this.Credentials.user,
            'p_clave_c': this.Credentials.password
        });
        const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_LOGIN2, {
            method: "POST",
            body
        });
        const $form = req.$.querySelector('form[name="mainPage"]');
        if (!$form)
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Element);
        const $pid = $form.querySelector('input[name="p_pidm_n"]');
        if (!$pid)
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Element);
        const pid = $pid.getAttribute('value');
        if (!pid)
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Attribute);
        const cookies = req.headers.getSetCookie();
        this.StudentBasics.pid = pid;
        this.CookieParser.parse(cookies, this.Jar);
    }
    async GetCarrera() {
        if (this.Jar.size == 0)
            throw new CookieError_js_1.CookieError(CookieError_js_1.CookieErrors.NOTCOOKIES);
        const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_GETCARRERA, {}, this.Jar);
        const $boleta = req.$.querySelector('a[target="Contenido"]');
        if (!$boleta)
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Element);
        const Carrera = $boleta.getAttribute('href');
        if (!Carrera)
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Attribute);
        return Carrera.split('majrp=')[1];
    }
    async LogOut() {
        try {
            if (this.Jar.size == 0)
                throw new CookieError_js_1.CookieError(CookieError_js_1.CookieErrors.NOTCOOKIES);
            const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_LOGOUT, {}, this.Jar);
            this.CookieParser.clearJar(this.Jar);
            this.Oppened = false;
        }
        catch (err) {
            throw new ParsingError_js_1.ParsingError(ParsingError_js_1.ErrorType.Invalid);
        }
    }
    async LogIn() {
        try {
            await this.StepOne.bind(this)();
            await this.StepTwo.bind(this)();
            this.StudentBasics.carrera = await this.GetCarrera();
            this.Oppened = true;
            return true;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Login = Login;
