export interface TransactionResWrapper {
    id:number;
    data: TransactionRes;
}

export interface TransactionRes {
    date: Date;
    type: string;
    amount: number;
    way: string;
    note: string;
    noteXtra: string;
    account: string;
    accountConnection: string;
}