import { Component, OnInit } from '@angular/core';
import { AccountTransactionService } from '../account-transaction.service';
import { TransactionTemplateGroupResWrapper } from '../service-response-wrappers/transaction-template-group-res-wrapper';
import { ActivatedRoute } from '@angular/router';
import { TransactionTemplateGroup } from '../transaction-template-group';
import { SessionDataService } from '../session-data.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-transaction-template',
  templateUrl: './account-transaction-template.component.html',
  styleUrls: ['./account-transaction-template.component.css']
})
export class AccountTransactionTemplateComponent implements OnInit {
    
  ttGroups: TransactionTemplateGroupResWrapper[] = [];
  accountList: Account[];
  initSelTtGroup: number;
  initSelAccount: string;  
  selGroup: TransactionTemplateGroupResWrapper;
  tgtMonth: string;
  tgtYear: string;

  constructor(
    private transactionService: AccountTransactionService,
    public sessionDataService: SessionDataService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != 0) {  // TODO lookup for optional route params instead of 0
      this.initSelTtGroup = id;
    }
    this.getAccounts();
    this.fetchTransactionGroups();
  }

  fetchTransactionGroups() : void {
    this.ttGroups = [];
    this.transactionService.getAllTtGroups(this.sessionDataService.selectedAccount.id).subscribe( res => {
      this.ttGroups = res;
    });
  }

  getAccounts() : void {
    this.accountList = [];
    if (this.sessionDataService.selectedAccount != null) {
      this.accountList.push(this.sessionDataService.selectedAccount);
    }
    this.transactionService.getAllAccounts(this.sessionDataService.loggedUser).subscribe( (accountWrapperList) => {
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

}
