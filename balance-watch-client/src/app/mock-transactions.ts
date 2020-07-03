import {AccountTransaction} from './account-transaction';

export const MOCK_TRANSACTIONS: AccountTransaction[] = [
    {
        account: 'ABC123',
        accountConnection: '',
        amount: 82.23,
        date: new Date(),
        id: 1,
        note1: 'recurrent',
        note2: '',
        type: 'Muni Tax',
        way: 'D'
    },
    {
        account: 'ABC123',
        accountConnection: '',
        amount: 2525.00,
        date: new Date(),
        id: 2,
        note1: 'salary',
        note2: 'early',
        type: 'Income',
        way: 'C'
    }

];