import { Component, OnInit, Input } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from '../account-transaction.service';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-account-transaction-details',
  templateUrl: './account-transaction-details.component.html',
  styleUrls: ['./account-transaction-details.component.css']
})
export class AccountTransactionDetailsComponent implements OnInit {
  
  transaction:AccountTransaction;
  selTransactionId: number;
  editMode: boolean;
  timeCheck: boolean;

  firstDayOfMonth:Date;
  lastDayOfMonth:Date;

  selDate: Date = new Date();
  selTime: Date = new Date();
  
  constructor(
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private router: Router,
    private sessionData: SessionDataService
    ) {}
    
    ngOnInit() {      
      this.firstDayOfMonth = new Date(+this.sessionData.summaryYear, +this.sessionData.summaryMonth-1, 1);
      this.lastDayOfMonth = new Date(+this.sessionData.summaryYear, +this.sessionData.summaryMonth, 0);

      const id = +this.route.snapshot.paramMap.get('id');

      if (id != 0) {
        this.editMode = true;
        this.getTransaction(id);
      } else {
        this.selTime.setHours(0, 0);
        this.editMode = false;        
        this.startFromNew();
      }
    }
    
    getTransaction(id: number) : void {    
      this.accountTransactionService.getTransaction(id).subscribe( t => {
        this.transaction = t;
        this.selTransactionId = id;
        this.selDate = new Date(t.date);
        this.selTime = new Date(t.date);
      } );
    }
    
    startFromNew() : void {
      this.transaction = {} as AccountTransaction;
      this.transaction.account = this.sessionData.selectedAccount.id;
    }
    
    goBack() : void {
      this.router.navigate(['/tsummary']);
    }
    
    update() : void {    
      this.injectTimeIntoModel();
      this.accountTransactionService.updateTransaction(this.transaction, this.selTransactionId).subscribe( r => {
        this.goBack();
      });
    }
    
    add() : void {
      this.injectTimeIntoModel();
      this.accountTransactionService.addTransaction(this.transaction).subscribe( 
        r => {
          this.goBack();
        },
        err => console.log(err)
        );     
    }

    injectTimeIntoModel() : void {
      let year = this.selDate.getFullYear();
      let month = this.selDate.getMonth();
      let day = this.selDate.getDate();
      let hours = this.selTime.getHours();
      let minutes = this.selTime.getMinutes();

      this.transaction.date = new Date(year, month, day, hours, minutes);
    }
    
    delete() : void {
      if (confirm("Are you sure you want to delete this transaction?")) {
        this.accountTransactionService.deleteTransaction(this.selTransactionId).subscribe( 
          r => {
            this.goBack();
          },
          err => console.log(err)
          );
        }
      }

  }
    
