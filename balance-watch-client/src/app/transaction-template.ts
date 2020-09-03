import { TTFrequency } from './frequency/tt-frequency';

export interface TransactionTemplate {
    id: number;
    type: string;
    amount: number;
    way: string;
    account: string;
    accountConnection: string;
    note: string;
    frequency: string;
}