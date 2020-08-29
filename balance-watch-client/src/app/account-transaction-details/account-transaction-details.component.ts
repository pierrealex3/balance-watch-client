import { Component, OnInit, Input } from '@angular/core';
import { AccountTransaction } from '../account-transaction';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountTransactionService } from '../account-transaction.service';

@Component({
  selector: 'app-account-transaction-details',
  templateUrl: './account-transaction-details.component.html',
  styleUrls: ['./account-transaction-details.component.css']
})
export class AccountTransactionDetailsComponent implements OnInit {

  transaction:AccountTransaction;
  selTransactionId: number;

  constructor(
    private route: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    private location: Location,
    private router: Router
    ) {}

  ngOnInit() {
    this.getTransaction();
  }

  getTransaction() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountTransactionService.getTransaction(id).subscribe( t => {
      this.transaction = t;
      this.selTransactionId = id;
    } );
  }

  goBack() : void {
    //this.location.back();
    this.router.navigate(['/tsummary']);
    
  }

  save() : void {
    this.accountTransactionService.updateTransaction(this.transaction, this.selTransactionId);
  }



}
