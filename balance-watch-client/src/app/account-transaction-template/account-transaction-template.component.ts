import { Component, OnInit } from '@angular/core';
import { AccountTransactionService } from '../account-transaction.service';
import { TransactionTemplateGroupResWrapper } from '../service-response-wrappers/transaction-template-group-res-wrapper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-transaction-template',
  templateUrl: './account-transaction-template.component.html',
  styleUrls: ['./account-transaction-template.component.css']
})
export class AccountTransactionTemplateComponent implements OnInit {
    
  ttGroups: TransactionTemplateGroupResWrapper[] = [];
  initSelTtGroup: number;
  initSelAccount: string;
  selAccount: string = 'ABC123';

  constructor(
    private transactionService: AccountTransactionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchTransactionGroups();
  }

  fetchTransactionGroups() : void {
    this.transactionService.getAllTtGroups(this.selAccount).subscribe( res => {
      this.ttGroups = res;

      const id = +this.route.snapshot.paramMap.get('id');
      if (id != 0) {  // TODO lookup for optional route params instead of 0
        this.initSelTtGroup = id;
      }
    });
  }

}
