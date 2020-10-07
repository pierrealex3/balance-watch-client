import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AccountTransactionService } from '../account-transaction.service';
import { TBoard } from '../tboard';

@Component({
  selector: 'app-som-home',
  templateUrl: './som-home.component.html',
  styleUrls: ['./som-home.component.css']
})
export class SomHomeComponent implements OnInit {

  fromPreviousMonth: boolean;
  balanceSom: string = '';
  balanceSomCalc: number;

  year: number;
  month: number;
  account: number;

  editMode: boolean = false;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private transactionService: AccountTransactionService) { }

  ngOnInit() {
    this.year = +this.activatedRoute.snapshot.paramMap.get('year');
    this.month = +this.activatedRoute.snapshot.paramMap.get('month');
    this.account = +this.activatedRoute.snapshot.paramMap.get('account');

    this.getSom();
  }

  goBack() : void {
    this.router.navigateByUrl('/tsummary');
  }

  getSom() : void {
    
    this.transactionService.getTBoard(+this.year, +this.month, this.account).subscribe( (res) => {
      this.editMode = true;
      this.balanceSom = res.startAmt.toString();
      this.fromPreviousMonth = !res.startAmtMan;
      this.balanceSomCalc = res.startAmtCalc;
    }, (err) => {
      
    });
    
  }

  balanceInput() : void {
    this.fromPreviousMonth = (this.balanceSom.length == 0 ? true : false);
  }

  addSomBalance() : void {
    this.transactionService.addSomBalance(+this.balanceSom, this.year, this.month, this.account, !this.fromPreviousMonth).subscribe( (res) => {
      // TODO add validation
      this.goBack();
    });

  }

  updSomBalance() : void {
    const req = new TBoard(this.year, this.month, this.account, +this.balanceSom, !this.fromPreviousMonth);
    this.transactionService.updSomBalance(req).subscribe( (res) => {
      // TODO add validation
      this.goBack();
    })
  }

  // Learn how to use currency pipe correctly before using this
  // toCurrency(element) : void {
  //   this.balanceSom = this.currencyPipe.transform(this.balanceSom);
  //   element.target.value = this.balanceSom;
  // }

}
