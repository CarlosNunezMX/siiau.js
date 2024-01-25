export declare class BasicData {
    pid: string;
    user: string;
    carrera: string;
}
export type Student = {
    Codigo: string;
    Situacion: "ACTIVO" | "INACTIVO" | string;
    Carrera: string;
    Centro: string;
    Sede: string;
    Certificacion: string;
    Nombre: string;
    Nivel: string;
    Admision: string;
    UltimoCiclo: string;
};
type Calificacion = number | ("AC" | "NA");
type Tipo = "OR" | "EX";
export type KardexItem = {
    Sede: string;
    NRC: string;
    Clave: string;
    Materia: string;
    Calificacion: Calificacion;
    Tipo: Tipo;
    NC: Number;
    HC: number;
    Fecha: string;
};
export type Area = {
    name: string;
    Requeridos: number;
    Adquiridos: number;
    Faltantes: number;
};
export type StudentSummary = {
    Promedio: number;
    Creditos: number;
    Areas: Area[];
    Certificado: string;
};
export {};
