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
  
  constructor(
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private router: Router,
    private sessionData: SessionDataService
    ) {}
    
    ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      if (id != 0) {
        this.editMode = true;
        this.getTransaction(id);
      } else {
        this.editMode = false;        
        this.startFromNew();
      }
    }
    
    getTransaction(id: number) : void {    
      this.accountTransactionService.getTransaction(id).subscribe( t => {
        this.transaction = t;
        this.selTransactionId = id;
      } );
    }
    
    startFromNew() : void {
      this.transaction = {} as AccountTransaction;
      this.transaction.account = this.sessionData.selAccount;
    }
    
    goBack() : void {
      this.router.navigate(['/tsummary']);
    }
    
    update() : void {    
      this.accountTransactionService.updateTransaction(this.transaction, this.selTransactionId).subscribe( r => {
        this.goBack();
      });
    }
    
    add() : void {
      this.accountTransactionService.addTransaction(this.transaction).subscribe( 
        r => {
          this.goBack();
        },
        err => console.log(err)
        );
      }
                
    }
