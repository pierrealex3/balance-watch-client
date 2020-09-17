import { Component, OnInit } from '@angular/core';
import { AccountTransactionService } from '../account-transaction.service';
import { SessionDataService } from '../session-data.service';
import { AccountResWrapper } from '../service-response-wrappers/account-res-wrapper';
import { Account } from '../account';

@Component({
  selector: 'app-accounts-home',
  templateUrl: './accounts-home.component.html',
  styleUrls: ['./accounts-home.component.css']
})
export class AccountsHomeComponent implements OnInit {

  accountList : Account[];

  constructor(
    private accountTransactionService: AccountTransactionService,
    private sessionDataService: SessionDataService
    ) { }

  ngOnInit() {
    this.accountList = [];
    this.getAllAccountsInScope();
  }

  getAllAccountsInScope() : void {
    this.accountTransactionService.getAllAccounts(this.sessionDataService.loggedUser).subscribe(  (accountResWrapperList: AccountResWrapper[]) => {
      accountResWrapperList.forEach( (accountResWrapper: AccountResWrapper) => {
        const account = {} as Account;
        account.id = accountResWrapper.id;
        account.accountNumber = accountResWrapper.data.accountNumber;
        account.desc = accountResWrapper.data.desc;
        this.accountList.push(account);
      } );
    });
  }

  onSelect(account: Account) : void {

  }

}
