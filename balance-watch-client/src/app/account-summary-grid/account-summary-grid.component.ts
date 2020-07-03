import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { AccountTransactionService } from '../account-transaction.service';



@Component({
  selector: 'app-account-summary-grid',
  templateUrl: './account-summary-grid.component.html',
  styleUrls: ['./account-summary-grid.component.css']
})
export class AccountSummaryGridComponent implements OnInit {

selectedTransaction: AccountTransaction;
transactions: AccountTransaction[];

  constructor(private accountTransactionService:AccountTransactionService ) {}

  ngOnInit() {
    this.getTransactions();
  }

  /**
   * Fetches the transactions from the service and updates this component with the fetched data.
   */
  getTransactions() : void {
    this.accountTransactionService.getTransactions().subscribe( t => this.transactions = t );
  }

  onSelect(t:AccountTransaction) : void {
    this.selectedTransaction = t;
  }

}
