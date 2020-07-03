export interface AccountTransaction {
    id: number;
    date: Date;
    type: string;
    amount: number;
    way: string;
    note1: string;
    note2: string;
    account: string;
    accountConnection: string;
}