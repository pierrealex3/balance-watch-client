export interface AccountTransaction {
    id: number;
    date: Date;
    type: string;
    amount: number;
    way: string;
    note: string;
    noteXtra: string;
    account: string;
    accountConnection: string;
}