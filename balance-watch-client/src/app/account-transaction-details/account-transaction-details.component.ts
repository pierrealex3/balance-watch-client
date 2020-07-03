import { Component, OnInit, Input } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccountTransactionService } from '../account-transaction.service';

@Component({
  selector: 'app-account-transaction-details',
  templateUrl: './account-transaction-details.component.html',
  styleUrls: ['./account-transaction-details.component.css']
})
export class AccountTransactionDetailsComponent implements OnInit {

  transaction:AccountTransaction;

  constructor(
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private location: Location
    ) {}

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountTransactionService.getTransaction(id).subscribe( t => this.transaction = t );
  }

  goBack() : void {
    this.location.back();
  }



}
