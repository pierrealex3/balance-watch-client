import { TTFrequency } from './frequency/tt-frequency';

export interface TransactionTemplate {
    id: number;
    type: string;
    amount: number;
    way: string;
    account: number;
    accountConnection: number;
    note: string;
    frequency: string;
}