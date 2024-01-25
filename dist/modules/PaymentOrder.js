"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOrder = void 0;
const downloader_js_1 = require("../scrapping/downloader.js");
const common_js_1 = require("../scrapping/common.js");
const SessionError_js_1 = require("../error/SessionError.js");
class PaymentOrder {
    Session;
    PaymentOrder = [];
    Total = 0;
    constructor(Session) {
        this.Session = Session;
    }
    async Get() {
        if (!this.Session.Oppened)
            throw new SessionError_js_1.SessionError(SessionError_js_1.SessionErrors.NotLogged);
        const req = await (0, downloader_js_1.Fetch)(common_js_1.Urls.SIIAU_PAYMENT_ORDER, {}, this.Session.Jar);
        const $ = req.$;
        const $td_s = $.querySelectorAll('table[align="left"] tr td');
        const $total = $td_s[$td_s.length - 1];
        let goodTDS = $td_s.slice(1, -1).filter(td => {
            const innerText = td.innerText.trim();
            const style = td.getAttribute('style');
            if (style && style === 'display:none;' || td.innerText === '') {
                return false;
            }
            return true;
        });
        this.Total = Number($total.innerText.replace('$', ''));
        const data = [];
        for (let i = 0; i < goodTDS.length; i += 6) {
            const current = goodTDS.slice(i, i + 6);
            const [$account, $concept, $description, $date, $endDate, $amount] = current;
            const Account = Number($account.innerText);
            const Concept = Number($concept.innerText);
            const Description = $description.innerText.trim();
            const Date = $date.innerText;
            const EndDate = $endDate.innerText;
            const Amount = Number($amount.innerText.replace('$', ''));
            this.PaymentOrder.push({ Account, Amount, Concept, Date, Description, EndDate });
        }
        return this.PaymentOrder;
    }
}
exports.PaymentOrder = PaymentOrder;
