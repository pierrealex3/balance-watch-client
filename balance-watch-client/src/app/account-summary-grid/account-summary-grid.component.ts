import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { AccountTransactionService } from '../account-transaction.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TransactionResWrapper } from '../service-response-wrappers/transaction-res-wrapper';
import { SessionDataService } from '../session-data.service';
import { Account } from '../account';
import { ToastrWrapperService } from '../toastr-wrapper.service';

@Component({
  selector: 'app-account-summary-grid',
  templateUrl: './account-summary-grid.component.html',
  styleUrls: ['./account-summary-grid.component.css']
})
export class AccountSummaryGridComponent implements OnInit {

  somBalance: number;
  selectedTransaction: AccountTransaction;
  transactions: AccountTransaction[] = [];
  subTransactionsCnt: number; // TODO un-fake
  selectedAccount: Account;
  accountList: Account[] = [];

  userId: string;

  constructor(
    private accountTransactionService: AccountTransactionService,
    public sessionDataService: SessionDataService,
    private route: ActivatedRoute,
    private toastr: ToastrWrapperService
  ) { }

  ngOnInit() {
    this.subTransactionsCnt = 0;  // TODO un-fake

    const paramMap: ParamMap = this.route.snapshot.paramMap;

    this.sessionDataService.authenticatedUser.subscribe(u => {
      this.userId = u;

      this.getAccounts();

      this.getSom();

      if (paramMap.keys.length === 0) {
        this.getTransactions();
      } else {
        this.sessionDataService.summaryYear = paramMap.get('forYear');
        this.sessionDataService.summaryMonth = paramMap.get('forMonth');
        this.getTransactionsFromTemplateGroup(paramMap.get('selGroup'), paramMap.get('forMonth'), paramMap.get('forYear'));
      }
    });
  }

  // TODO this function has a copy within account-transaction-template... think about sharing the code.
  getAccounts(): void {
    this.accountList = [];
    if (this.sessionDataService.selectedAccount != null) {
      this.accountList.push(this.sessionDataService.selectedAccount);
    }
    this.accountTransactionService.getAllAccounts(this.userId).subscribe((accountWrapperList) => {
      accountWrapperList.forEach((aw) => {

        const exAccount = this.accountList.find((value: Account) => {
          return value.id === aw.id;
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
  getTransactions(): void {
    if (this.sessionDataService.selectedAccount) {
      this.transactions = [];
      this.handleTransactionsFromService(this.sessionDataService.summaryMonth, this.sessionDataService.summaryYear);
    }
  }

  /**
   * Calls the HTTP service to get transactions and manages the callbacks.
   * Note: what was a good idea back then may have changed with the progress of the app features.
   * TODO think about subscribing the Observable<ResWrapper> within this method, to keep the HTTP service proxy more generic.
   */
  handleTransactionsFromService(month: string, year: string, successCallback?: () => void, errorCallback?: () => void) {
    this.accountTransactionService.getTransactions(year, month, this.sessionDataService.selectedAccount.id,
      ii => {
      this.transactions.push(this.mapFromWrapperToTransaction(ii));
    },
    subTransactionsCount => {
      this.subTransactionsCnt = subTransactionsCount;
      if (successCallback !== undefined) {
        successCallback();
      }
    },
    errorCallback);
  }

  getSomAndTransactions(): void {
    this.getSom();
    this.getTransactions();
  }

  get sortedTransactions(): AccountTransaction[] {
    return this.transactions.sort((a, b) => {
      const aa: Date = new Date(a.date);
      const bb: Date = new Date(b.date);
      return aa < bb ? -1 : (aa === bb ? 0 : 1);
    });
  }

  balanceAtIndex(i: number): number {
    console.log('balanceAtIndex:' + i);
    return this.sortedTransactions.slice(0, i + 1)
      .map(at => at.way === 'DEBIT' ? at.amount * -1 : at.amount )
      .reduce((pr, cu) => {
        console.log('pr=' + pr + ' cu=' + cu);
        return pr + cu;
      }, this.somBalance); // this.somBalance is the initial value by the provided account balance on current month's day-1.
  }

  onSelect(t: AccountTransaction): void {
    this.selectedTransaction = t;
  }

  onAccountSelect(): void {
    this.sessionDataService.selectedAccount = this.selectedAccount;
  }

  getTransactionsFromTemplateGroup(groupId: string, month: string, year: string): void {

    const fetchTransactionMsgErr = `There was a problem fetching transactions for month:${month} year:${year}`;
    this.accountTransactionService.generateTransactions(groupId, month, year,
      () => {
        this.handleTransactionsFromService(month, year,
          () => this.toastr.success('Transactions have been generated successfully'),
          () => this.toastr.error(fetchTransactionMsgErr));
      },
      () => {
        this.handleTransactionsFromService(month, year, undefined, () => this.toastr.error(fetchTransactionMsgErr) );
        this.toastr.error('There was a problem generating transactions from canvas');
      }
    );
  }

  getSom(): void {
    if (this.sessionDataService.selectedAccount) {
      this.accountTransactionService.
      getTBoard(+this.sessionDataService.summaryYear, +this.sessionDataService.summaryMonth, this.sessionDataService.selectedAccount.id).
      subscribe((res) => {
        this.somBalance = res.startAmtCalc;
      }, (err) => {
        this.somBalance = 0;
      });
    }
  }

  // refactor this mapper somewhere else
  mapFromWrapperToTransaction(i: TransactionResWrapper): AccountTransaction {
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
      ttIdGen: i.data.ttIdGen,
      flagSubmitted: i.data.flagSubmitted
    };
    return t;
  }

  accountYearMonthAvail(): boolean {
    return this.sessionDataService.selectedAccount != null
    && this.sessionDataService.summaryYear != null
    && this.sessionDataService.summaryMonth != null;
  }

}
