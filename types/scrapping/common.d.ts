export declare enum Urls {
    SIIAU_HOME_URL = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio",
    SIIAU_LOGINS1 = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.forma_inicio_bd",
    SIIAU_LOGIN2 = "https://siiauescolar.siiau.udg.mx/wus/GUPPRINCIPAL.VALIDA_INICIO",
    SIIAU_LOGOUT = "https://siiauescolar.siiau.udg.mx/wus/gupprincipal.salir",
    SIIAU_GETCARRERA = "http://siiauescolar.siiau.udg.mx/wal/gupmenug.menu?p_sistema_c=ALUMNOS SEMS&p_sistemaid_n=1430&p_menupredid_n=1434&p_pidm_n=",
    SIIAU_KARDEX_S1 = "https://siiauescolar.siiau.udg.mx/wal/sglhist.kardex?pidmp=?1&majrp=?2",
    SIIAU_KARDEX_S2 = "https://siiauescolar.siiau.udg.mx/wal/sgpgral.doble_carrera",
    SIIAU_KARDEX_SFINAL = "https://siiauescolar.siiau.udg.mx/wal/SHLKARD_TAE.MUESTRO_KARDEX",
    SIIAU_PAYMENT_ORDER = "https://siiauescolar.siiau.udg.mx/wal/SFBORPA.INICIO"
}
export declare const CommonHeaders: {
    "User-Agent": string;
    Accept: string;
    "Accept-Language": string;
    "Accept-Encoding": string;
    "Content-Type": string;
};
export declare function Cred(val: Record<string, string>): string;
