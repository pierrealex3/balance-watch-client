import { Component, OnInit } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from '../account-transaction.service';
import { SessionDataService } from '../session-data.service';
import { Account } from '../account';
import { Observable } from 'rxjs';
import { NgModel } from '@angular/forms';
import { ToastrWrapperService } from '../toastr-wrapper.service';

@Component({
  selector: 'app-account-transaction-details',
  templateUrl: './account-transaction-details.component.html',
  styleUrls: ['./account-transaction-details.component.css']
})
export class AccountTransactionDetailsComponent implements OnInit {

  VALIDATION_MSG_GEN = 'Please specify all values required before saving';

  transaction: AccountTransaction;
  connectedAccount: Account;

  selTransactionId: number;

  // state mgmt
  editMode: boolean;
  timeCheck: boolean;
  invalidSaveAttempt = false;

  firstDayOfMonth: Date;
  lastDayOfMonth: Date;

  selDate: Date = new Date();
  selTime: Date = new Date();

  userId: string;

  otherAccounts: Account[] = [];
  selTransactionLastUpdated: string;

  constructor(
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private router: Router,
    private sessionData: SessionDataService,
    private toastrWrapperService: ToastrWrapperService
  ) { }

  ngOnInit() {
    this.sessionData.authenticatedUser.subscribe(u => {
      this.userId = u;

      this.firstDayOfMonth = new Date(+this.sessionData.summaryYear, +this.sessionData.summaryMonth - 1, 1);
      this.lastDayOfMonth = new Date(+this.sessionData.summaryYear, +this.sessionData.summaryMonth, 0);

      this.getSelectableOtherAccounts().subscribe(x => {

        const id = +this.route.snapshot.paramMap.get('id');

        if (id != 0) {
          this.editMode = true;
          this.getTransaction(id);
        } else {
          this.selTime.setHours(0, 0);
          this.editMode = false;
          this.startFromNew();
        }

      });

    });
  }

  getTransaction(id: number): void {
    this.accountTransactionService.getTransaction(id).subscribe(t => {
      this.transaction = t.body;
      this.selTransactionId = id;
      this.selTransactionLastUpdated = t.headers.get('X-Last-Modified');
      this.selDate = new Date(t.body.date);
      this.selTime = new Date(t.body.date);
      this.connectedAccount = this.otherAccounts.find(o => o.id == t.body.accountConnection);
    });
  }

  /**
  * Returns a list of accounts to be used within the transaction's "Connected Account" field.
  * @param id
  */
  getSelectableOtherAccounts(): Observable<any> {

    const jobDone: Observable<any> = new Observable(subs => {

      this.accountTransactionService.getAllAccounts(this.userId).subscribe(awArr => {

        this.otherAccounts = awArr.map(aw => {
          let accModel: Account = new Account(aw.data.accountNumber, aw.data.desc);
          accModel.id = aw.id;
          return accModel;
        }).filter(accModel => this.sessionData.selectedAccount.id != accModel.id);

        subs.next();

      });

    });

    return jobDone;
  }

  startFromNew(): void {
    this.transaction = {} as AccountTransaction;
    this.transaction.account = this.sessionData.selectedAccount.id;
  }

  goBack(): void {
    this.router.navigate(['/tsummary']);
  }

  update(date: NgModel, way: NgModel, amount: NgModel, type: NgModel): void {
    if (!this.submit(date, way, amount, type)) {
      return;
    }

    this.mapFormToDto();
    this.accountTransactionService.updateTransaction(this.transaction, this.selTransactionId, this.selTransactionLastUpdated).subscribe(r => {
      this.goBack();
    });
  }

  add(date: NgModel, way: NgModel, amount: NgModel, type: NgModel): void {
    if (!this.submit(date, way, amount, type)) {
      return;
    }

    this.mapFormToDto();
    this.accountTransactionService.addTransaction(this.transaction).subscribe(
      r => {
        this.goBack();
      },
      err => console.log(err)
    );
  }

  /**
   * Maps the form model to a DTO ready for REST backend interaction.
   */
  mapFormToDto(): void {
    this.transaction.accountConnection = this.connectedAccount === null || this.connectedAccount === undefined ? undefined : this.connectedAccount.id;  // TODO upgrade TS and use the Optional Chaining feature
    this.injectTimeIntoModel();
  }

  injectTimeIntoModel(): void {
    let year = this.selDate.getFullYear();
    let month = this.selDate.getMonth();
    let day = this.selDate.getDate();
    let hours = this.selTime.getHours();
    let minutes = this.selTime.getMinutes();

    this.transaction.date = new Date(year, month, day, hours, minutes);
  }

  delete(): void {
    if (confirm("Are you sure you want to delete this transaction?")) {
      this.accountTransactionService.deleteTransaction(this.selTransactionId).subscribe(
        r => {
          this.goBack();
        },
        err => console.log(err)
      );
    }
  }

  /**
   * Validates form @ save time
   */
  submit(date: NgModel, way: NgModel, amount: NgModel, type: NgModel): boolean {
    const valid: boolean = date.valid && way.valid && amount.valid && type.valid;
    if (!valid) {
      this.toastrWrapperService.error(this.VALIDATION_MSG_GEN);
      this.invalidSaveAttempt = true;
    }
    return valid;
  }

}

