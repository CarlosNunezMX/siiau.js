import type { Login } from "./login.js";
export type OrderType = {
    Account: number | string;
    Concept: number;
    Description: string;
    Date: string;
    EndDate: string;
    Amount: number;
};
export declare class PaymentOrder {
    Session: Login;
    PaymentOrder: OrderType[];
    Total: number;
    constructor(Session: Login);
    Get(): Promise<OrderType[]>;
}
