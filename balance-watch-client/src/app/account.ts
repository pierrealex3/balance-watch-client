export class Account {
    id: number;
    accountNumber: string;
    desc: string;

    constructor(accountNumber: string, desc: string) {
        this.accountNumber = accountNumber;
        this.desc = desc;
    }
}