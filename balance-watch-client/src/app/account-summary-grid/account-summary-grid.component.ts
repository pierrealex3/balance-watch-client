import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { AccountTransactionService } from '../account-transaction.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TransactionResWrapper } from '../service-response-wrappers/transaction-res-wrapper';

@Component({
  selector: 'app-account-summary-grid',
  templateUrl: './account-summary-grid.component.html',
  styleUrls: ['./account-summary-grid.component.css']
})
export class AccountSummaryGridComponent implements OnInit {

selectedTransaction: AccountTransaction;
transactions: AccountTransaction[] = [];

selMonth: string;

  constructor(
    private accountTransactionService:AccountTransactionService,
    private route: ActivatedRoute 
    ) {}

  ngOnInit() {
    const paramMap:ParamMap = this.route.snapshot.paramMap;
    if (paramMap.keys.length == 0) {
      this.getTransactions();    
    } else {      
      this.selMonth = paramMap.get('forMonth');
      this.getTransactionsFromTemplateGroup(paramMap.get('selGroup'), paramMap.get('forMonth'), paramMap.get('forYear'));
    }
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

  getTransactionsFromTemplateGroup(groupId:string, month:string, year:string) : void {
    this.accountTransactionService.generateTransactions(groupId, month, year, i => {
      this.transactions.push(this.mapFromWrapperToTransaction(i));
    } );
  }

  // refactor this mapper somewhere else
  mapFromWrapperToTransaction(i: TransactionResWrapper) : AccountTransaction {
    const t: AccountTransaction = {
      id: i.id,
      date: i.data.date,
      type: i.data.type,
      amount: i.data.amount,
      way: i.data.way,
      note: i.data.note,
      noteXtra: i.data.noteXtra,
      account: i.data.account,
      accountConnection: i.data.accountConnection
    };
    return t;
  }


}
