import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { AccountTransactionService } from '../account-transaction.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TransactionResWrapper } from '../service-response-wrappers/transaction-res-wrapper';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-account-summary-grid',
  templateUrl: './account-summary-grid.component.html',
  styleUrls: ['./account-summary-grid.component.css']
})
export class AccountSummaryGridComponent implements OnInit {

selectedTransaction: AccountTransaction;
transactions: AccountTransaction[] = [];

  constructor(
    private accountTransactionService:AccountTransactionService,
    public sessionDataService: SessionDataService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const paramMap:ParamMap = this.route.snapshot.paramMap;
    if (paramMap.keys.length == 0) {
      this.getTransactions();    
    } else {            
      this.sessionDataService.summaryYear = paramMap.get('forYear');
      this.sessionDataService.summaryMonth = paramMap.get('forMonth');
      this.getTransactionsFromTemplateGroup(paramMap.get('selGroup'), paramMap.get('forMonth'), paramMap.get('forYear'));
    }
  }

  /**
   * Fetches the transactions from the service and updates this component with the fetched data.
   */
  getTransactions() : void {
    this.accountTransactionService.getTransactions(this.sessionDataService.summaryYear, this.sessionDataService.summaryMonth, this.sessionDataService.selAccount, t => {
      this.transactions.push(this.mapFromWrapperToTransaction(t));
     });
  }

  get sortedTransactions() : AccountTransaction[] {
    return this.transactions.sort( (a, b) => {
      let aa:Date = new Date(a.date);
      let bb:Date = new Date(b.date);
       return aa<bb ? -1 : (aa===bb ? 0 : 1) 
      });
  }

  copysortedTransactions() : AccountTransaction[] {
    return this.transactions.sort( (a, b) => {
      let aa:Date = new Date(a.date);
      let bb:Date = new Date(b.date);
       return aa<bb ? -1 : (aa===bb ? 0 : 1) 
      });
  }

  balanceAtIndex(i:number) : number {
    console.log('balanceAtIndex:' + i);
    return this.sortedTransactions.slice(0, i+1)
    .map( at => {return at.way === 'DEBIT' ? at.amount*-1 : at.amount} )
    .reduce( (pr, cu) => {
      console.log('pr=' + pr + ' cu=' + cu);
      return pr + cu
    } , 0); // TODO replace the 0 initial value by the provided account balance on current month's day-1.
  }

  onSelect(t:AccountTransaction) : void {
    this.selectedTransaction = t;
  }

  getTransactionsFromTemplateGroup(groupId:string, month:string, year:string) : void {
    this.accountTransactionService.generateTransactions(groupId, month, year, () => {      

      this.accountTransactionService.getTransactions(year, month, "ABC123", ii => {
        console.log('transaction added to list');
        this.transactions.push(this.mapFromWrapperToTransaction(ii));
      });
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
      accountConnection: i.data.accountConnection,
      ttIdGen: i.data.ttIdGen
    };
    return t;
  }


}
