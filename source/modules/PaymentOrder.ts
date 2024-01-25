import type { Login } from "./login.js";
import { Fetch } from "../scrapping/downloader.js";
import { Urls } from "../scrapping/common.js";
import { HTMLElement } from "node-html-parser";
import { ErrorType, ParsingError } from "../error/ParsingError.js";
import { SessionError, SessionErrors } from "../error/SessionError.js";

export type OrderType = {
    Account: number | string;
    Concept: number;
    Description: string;
    Date: string;
    EndDate: string;
    Amount: number;
}

export class PaymentOrder {
    Session: Login;
    PaymentOrder: OrderType[] = [];
    Total: number = 0;

    constructor(Session: Login) {
        this.Session = Session;
    }

    async Get() {
        if (!this.Session.Oppened)
            throw new SessionError(SessionErrors.NotLogged)
        const req = await Fetch(Urls.SIIAU_PAYMENT_ORDER, {}, this.Session.Jar);
        const $ = req.$;

        const $td_s = $.querySelectorAll('table[align="left"] tr td');
        const $total = $td_s[$td_s.length - 1 ];
        let goodTDS = $td_s.slice(1, -1).filter(td => {
            const innerText = td.innerText.trim()
            const style = td.getAttribute('style')
            if(style && style === 'display:none;' || td.innerText === ''){
                return false
            }
            return true
        });
        
        this.Total = Number($total.innerText.replace('$', ''));

        
        const data: OrderType[] = [];
        for(let i = 0; i < goodTDS.length; i+=6){
            const current = goodTDS.slice(i, i + 6);
            const [
                $account, 
                $concept,
                $description,
                $date, 
                $endDate,
                $amount
            ] = current;
            
            const Account = Number($account.innerText);
            const Concept = Number($concept.innerText);
            const Description = $description.innerText.trim();
            const Date = $date.innerText;
            const EndDate = $endDate.innerText;
            const Amount = Number($amount.innerText.replace('$', ''))
            this.PaymentOrder.push({Account,Amount,Concept,Date,Description,EndDate})
            
        }
        return this.PaymentOrder;
    }
}