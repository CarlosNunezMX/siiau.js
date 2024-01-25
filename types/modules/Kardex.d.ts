import type { Login } from "./login.js";
import { HTMLElement } from "node-html-parser";
import { KardexItem, Student, StudentSummary } from "./student.js";
export declare class Kardex {
    Session: Login;
    StudentInfo: Student | undefined;
    StudentKardex: KardexItem[];
    StudentSummary: StudentSummary | undefined;
    constructor(Session: Login);
    private GetInputs;
    private StepOne;
    private StepTwo;
    private GetData;
    Student($: HTMLElement | undefined): Promise<Student>;
    private ProcessResult;
    OnlyKardex($: HTMLElement | undefined): Promise<KardexItem[]>;
    Summary($: HTMLElement | undefined): Promise<StudentSummary>;
    Kardex(): Promise<{
        Info: Student;
        Kardex: KardexItem[];
        Summary: ($: HTMLElement | undefined) => Promise<StudentSummary>;
    }>;
}
