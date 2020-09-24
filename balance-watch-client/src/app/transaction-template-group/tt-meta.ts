import { TransactionTemplate } from '../transaction-template';
import { TTFrequency } from '../frequency/tt-frequency';

export class TTMeta {
    id:number;
    freqRef:TTFrequency;    
    data: TransactionTemplate;

    constructor(datax:TransactionTemplate) {
        this.data = datax;
    }

}