"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cred = exports.CommonHeaders = exports.Urls = void 0;
var Urls;
(function (Urls) {
    Urls["SIIAU_HOME_URL"] = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio";
    Urls["SIIAU_LOGINS1"] = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio_bd";
    Urls["SIIAU_LOGIN2"] = "https://siiauescolar.siiau.udg.mx/wus/GUPPRINCIPAL.VALIDA_INICIO";
    Urls["SIIAU_LOGOUT"] = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.salir";
    Urls["SIIAU_GETCARRERA"] = "http://siiauescolar.siiau.udg.mx/wal/gupmenug.menu?p_sistema_c=ALUMNOS SEMS&p_sistemaid_n=1430&p_menupredid_n=1434&p_pidm_n=";
    Urls["SIIAU_KARDEX_S1"] = "https://siiauescolar.siiau.udg.mx/wal/sglhist.kardex?pidmp=?1&majrp=?2";
    Urls["SIIAU_KARDEX_S2"] = "https://siiauescolar.siiau.udg.mx/wal/sgpgral.doble_carrera";
    Urls["SIIAU_KARDEX_SFINAL"] = "https://siiauescolar.siiau.udg.mx/wal/SHLKARD_TAE.MUESTRO_KARDEX";
    Urls["SIIAU_PAYMENT_ORDER"] = "https://siiauescolar.siiau.udg.mx/wal/SFBORPA.INICIO";
})(Urls || (exports.Urls = Urls = {}));
exports.CommonHeaders = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "es-MX,es;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded"
};
function Cred(val) {
    return new URLSearchParams(val)
        .toString();
}
exports.Cred = Cred;
