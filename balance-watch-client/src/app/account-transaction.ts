export interface AccountTransaction {
    id: number;
    date: Date;
    type: string;
    amount: number;
    way: string;
    note: string;
    noteXtra: string;
    account: number;
    accountConnection: number;
    ttIdGen: number;
    connectivityStatus: string;
}