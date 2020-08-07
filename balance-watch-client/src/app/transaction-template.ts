import { FrequencyResWrapper } from './service-response-wrappers/frequency-res-wrapper';

export interface TransactionTemplate {
    id: number;
    type: string;
    amount: number;
    way: string;
    account: string;
    accountConnection: string;
    note: string;
    frequencyList: Array<FrequencyResWrapper>;
}