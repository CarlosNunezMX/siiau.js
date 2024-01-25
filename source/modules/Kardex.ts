import type { Login } from "./login.js";
import { Fetch } from "../scrapping/downloader.js";
import { Urls } from "../scrapping/common.js";
import { HTMLElement } from "node-html-parser";
import { ErrorType, ParsingError } from "../error/ParsingError.js";
import { Area, KardexItem, Student, StudentSummary } from "./student.js";
import { SessionError, SessionErrors } from "../error/SessionError.js";


export class Kardex{
    Session: Login;
    StudentInfo: Student | undefined;
    StudentKardex: KardexItem[] = [];
    StudentSummary: StudentSummary | undefined;
    constructor(Session: Login){
        this.Session = Session;
    }

    private GetInputs($inputs: HTMLElement[]){
        const _Jar = new URLSearchParams();
        $inputs.forEach($input => {
            
            const key = $input.getAttribute('name');
            const value = $input.getAttribute('value');

            if(!key || (!value && value !== ''))
                throw new ParsingError(ErrorType.Attribute);

            _Jar.set(key, value);
        })

        if(_Jar.size === 0)
            throw new ParsingError(ErrorType.Invalid);

        return _Jar.toString();
    }
    private async StepOne(){
        if(!this.Session.Oppened)
            throw new SessionError(SessionErrors.NotLogged);

        const url = Urls.SIIAU_KARDEX_S1
            .replace('?1', this.Session.StudentBasics.pid)
            .replace('?2', this.Session.StudentBasics.carrera);
        const req = await Fetch(url, {}, this.Session.Jar);
        const $inputs = req.$.querySelectorAll('input[type="hidden"]');
        
        if($inputs.length === 0)
            throw new ParsingError(ErrorType.Element);
        return this.GetInputs($inputs);
    }

    private async StepTwo(formData: string){
        const req = await Fetch(Urls.SIIAU_KARDEX_S2, {
            body: formData,
            method: "POST"
        }, this.Session.Jar);

        const $inputs = req.$.querySelectorAll('input[type="hidden"]');
        if($inputs.length === 0)
            throw new ParsingError(ErrorType.Element);

        return this.GetInputs($inputs);
    }

    private async GetData(formData: string){
        const req = await Fetch(Urls.SIIAU_KARDEX_SFINAL, {
            method: "POST",
            body: formData
        }, this.Session.Jar);

        return req.$;
    }

    async Student($: HTMLElement | undefined): Promise<Student>{
        if(!$){
            $ = await this.GetData(
                await this.StepTwo.bind(this)(
                    await this.StepOne.bind(this)()
                )
            );
        }
        const StudentTable = $.querySelector('table');
        if(!StudentTable)
            throw new ParsingError(ErrorType.Element)
        const Values = StudentTable.querySelectorAll('td')
        if(Values.length !== 10)
            throw new ParsingError(ErrorType.Invalid);

        return {
            Codigo: Values[0].innerText,
            Nombre: Values[1].innerText,
            Situacion: Values[2].innerText,
            Nivel: Values[3].innerText,
            Admision: Values[4].innerText,
            UltimoCiclo: Values[5].innerText,
            Carrera: Values[6].innerText,
            Centro: Values[7].innerText,
            Sede: Values[8].innerText,
            Certificacion: Values[9].innerText
        }
    }

    private ProcessResult(val: HTMLElement): "AC" | "NC" | number{
        const just = val.innerText.split('(')[0].trim();
        if(!just)
            throw new ParsingError(ErrorType.Invalid);
        let Note = Number(just);
        if(isNaN(Note))
            // @ts-ignore
            return just;
        
        return Note;
    }

    async OnlyKardex($: HTMLElement | undefined): Promise<KardexItem[]>{
        if(!$){
            $ = await this.GetData(
                await this.StepTwo.bind(this)(
                    await this.StepOne.bind(this)()
                )
            );
        }
        const KardexTable = $.querySelector('table[border="1"]');
        if(!KardexTable)
            throw new ParsingError(ErrorType.Element)
        const Items = KardexTable.querySelectorAll('tr:has(td)')
        // @ts-ignore
        return Items.map((item) => {
            const items = item.querySelectorAll('td');
            if(items.length !> 9)
                throw new ParsingError(ErrorType.Element);

            return {
                Sede: items[0].innerText,
                NRC: items[1].innerText,
                Clave: items[2].innerText,
                Materia: items[3].innerText,
                Calificacion: this.ProcessResult(items[4]),
                Tipo: items[5].innerText.split('(')[1].split(')')[0],
                NC: Number(items[6].innerText),
                HC: Number(items[7].innerText),
                Fecha: items[8].innerHTML
            }
        })
    }

    async Summary($: HTMLElement | undefined): Promise<StudentSummary>{
        if(!$){
            $ = await this.GetData(
                await this.StepTwo.bind(this)(
                    await this.StepOne.bind(this)()
                )
            );
        }

        const PromedioSummaryTable = $.querySelector('div#promedio table');
        if(!PromedioSummaryTable)
            throw new ParsingError(ErrorType.Element);
        const items = PromedioSummaryTable.querySelectorAll('td');

        items.forEach(item => console.log(item.text))
        const data = $.querySelectorAll('td[align="center"]').map(e => e.text);
        const areas = $.querySelectorAll('th[align="left"]').slice(-2);
        let x: Area[] = []
        for(let i = 0; i < data.length; i += 3){
            let Requeridos = data[i];
            let Adquiridos = Number(data[i + 1]);
            let Faltantes = Number(data[i + 2]);
            // @ts-ignore
            x.push({Requeridos, Adquiridos, Faltantes});
        }

        return {
            Promedio: Number(items[0].innerText),
            Creditos: Number(items[1].innerText),
            Areas: areas.map((area, i) => {
                const name = area.text;

                return {
                    // @ts-ignore
                    name,
                    ...x[i]
                }
            }).map(area => {
                return {
                    ...area,
                    // @ts-ignore
                    Adquiridos: Number(area.Adquiridos)
                }
            }),
            // @ts-ignore
            Certificado: x.pop().Requeridos
        }
    }

    async Kardex(){
        if(!this.Session.Oppened)
            throw new SessionError(SessionErrors.NotLogged)
        const $ = await this.GetData(
            await this.StepTwo.bind(this)(
                await this.StepOne.bind(this)()
            )
        )
        this.StudentSummary = await this.Summary.bind(this)($);
        this.StudentInfo = await this.Student.bind(this)($);
        this.StudentKardex = await this.OnlyKardex.bind(this)($);

        return {
            Info: this.StudentInfo,
            Kardex: this.StudentKardex,
            Summary: this.Summary
        };
    }
}