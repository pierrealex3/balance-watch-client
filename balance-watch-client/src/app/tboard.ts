export class TBoard {
    year: number;
    month: number;
    account: number;
    startAmt: number;
    startAmtCalc: number;
    startAmtMan: boolean;

    constructor(year: number,
                month: number,
                account: number,
                startAmt: number,
                startAmtMan: boolean,
                startAmtCalc?: number) {
        this.year = year;
        this.month = month;
        this.account = account;
        this.startAmt = startAmt;
        this.startAmtCalc = startAmtCalc;
        this.startAmtMan = startAmtMan;
    }
}