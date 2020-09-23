import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { AccountTransactionService } from '../account-transaction.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TransactionResWrapper } from '../service-response-wrappers/transaction-res-wrapper';
import { SessionDataService } from '../session-data.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-summary-grid',
  templateUrl: './account-summary-grid.component.html',
  styleUrls: ['./account-summary-grid.component.css']
})
export class AccountSummaryGridComponent implements OnInit {

somBalance: number;  
selectedTransaction: AccountTransaction;
transactions: AccountTransaction[] = [];
selectedAccount: Account;
accountList: Account[] = [];

  constructor(
    private accountTransactionService:AccountTransactionService,
    public sessionDataService: SessionDataService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const paramMap:ParamMap = this.route.snapshot.paramMap;
    this.getAccounts();
    this.getSom();
    
    if (paramMap.keys.length == 0) {
      this.getTransactions();    
    } else {            
      this.sessionDataService.summaryYear = paramMap.get('forYear');
      this.sessionDataService.summaryMonth = paramMap.get('forMonth');
      this.getTransactionsFromTemplateGroup(paramMap.get('selGroup'), paramMap.get('forMonth'), paramMap.get('forYear'));
    }    
  }

  // TODO this function has a copy within account-transaction-template... think about sharing the code.
  getAccounts() : void {
    this.accountList = [];
    if (this.sessionDataService.selectedAccount != null) {
      this.accountList.push(this.sessionDataService.selectedAccount);
    }
    this.accountTransactionService.getAllAccounts(this.sessionDataService.loggedUser).subscribe( (accountWrapperList) => {
      accountWrapperList.forEach( (aw) => {

        const exAccount = this.accountList.find( (value:Account) => {
          return value.id == aw.id;
        });

        if (exAccount) {
          exAccount.accountNumber = aw.data.accountNumber;
          exAccount.desc = aw.data.desc;
        } else {
          const account = new Account(aw.data.accountNumber, aw.data.desc);
          account.id = aw.id;
          this.accountList.push(account);
        }
      });      
    });

  }

  /**
   * Clears the actual transactions and fetches the transactions from the service and updates this component with the fetched data.
   */
  getTransactions() : void {
    if (this.sessionDataService.selectedAccount) {
      this.transactions = [];    
      this.accountTransactionService.getTransactions(this.sessionDataService.summaryYear, this.sessionDataService.summaryMonth, this.sessionDataService.selectedAccount.id, t => {      
        this.transactions.push(this.mapFromWrapperToTransaction(t));
      });
    }
  }

  getSomAndTransactions() : void {
    this.getSom();
    this.getTransactions();
  }

  get sortedTransactions() : AccountTransaction[] {
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
    } , this.somBalance); // this.somBalance is the initial value by the provided account balance on current month's day-1.
  }

  onSelect(t:AccountTransaction) : void {
    this.selectedTransaction = t;
  }

  onAccountSelect() : void {    
    this.sessionDataService.selectedAccount = this.selectedAccount;
  }

  getTransactionsFromTemplateGroup(groupId:string, month:string, year:string) : void {
    this.accountTransactionService.generateTransactions(groupId, month, year, () => {      

      this.accountTransactionService.getTransactions(year, month, this.sessionDataService.selectedAccount.id, ii => {
        console.log('transaction added to list');
        this.transactions.push(this.mapFromWrapperToTransaction(ii));
      });
    } );
  }

  getSom() : void {
    if (this.sessionDataService.selectedAccount) {
      this.accountTransactionService.getTBoard(+this.sessionDataService.summaryYear, +this.sessionDataService.summaryMonth, this.sessionDataService.selectedAccount.id).subscribe( (res) => {
          this.somBalance = res.startAmt;
      }, (err) => {
        this.somBalance = 0;
      });
    }
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

  accountYearMonthAvail() : boolean {
    return this.sessionDataService.selectedAccount != null && this.sessionDataService.summaryYear != null && this.sessionDataService.summaryMonth != null;
  }

}
