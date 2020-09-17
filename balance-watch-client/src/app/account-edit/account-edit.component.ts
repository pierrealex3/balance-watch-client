import { Component, OnInit } from '@angular/core';
import { AccountTransactionService } from '../account-transaction.service';
import { SessionDataService } from '../session-data.service';
import { Account } from '../account';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  editMode: boolean;
  selAccount: Account;

  constructor(
    private transactionService: AccountTransactionService,
    private sessionDataService: SessionDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {    
    this.selAccount = {} as Account;
    const id = +this.route.snapshot.paramMap.get('id');    
    if (id != 0) {
      this.editMode = true;
      this.getAccount(id);
    } else {      
      this.editMode = false;              
    }
  }

  getAccount(id: number) : void {
    this.transactionService.getAccount(id).subscribe( accountWrapper => {
      this.selAccount.id = accountWrapper.id;
      this.selAccount.accountNumber = accountWrapper.data.accountNumber;
      this.selAccount.desc = accountWrapper.data.desc;      
    });
  }

  save() : void {
    this.transactionService.addAccount(this.sessionDataService.loggedUser, this.selAccount).subscribe( (res) => {
      // TODO manage errors
        this.goBack();
    });
  }

  update() : void {
    this.transactionService.updateAccount(this.selAccount).subscribe( (res) => {
      // TODO manage errors
      this.goBack();
    });
  }

  goBack() : void {
    this.router.navigate(['/accounts']);
  }

}
