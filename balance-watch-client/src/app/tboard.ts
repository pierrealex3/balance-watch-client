export class TBoard {
    year: number;
    month: number;
    account: number;
    startAmt: number;

    constructor(year: number,
                month: number,
                account: number,
                startAmt: number) {
        this.year = year;
        this.month = month;
        this.account = account;
        this.startAmt = startAmt;
    }
}