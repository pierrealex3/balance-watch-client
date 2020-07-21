import { Component, OnInit } from '@angular/core';
import { TransactionTemplate } from '../transaction-template';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-template-group',
  templateUrl: './transaction-template-group.component.html',
  styleUrls: ['./transaction-template-group.component.css']
})
export class TransactionTemplateGroupComponent implements OnInit {

  name: String;
  activeTT: TransactionTemplate;
  listOfTT: TransactionTemplate[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.clearFields();
  }

  saveActiveTT(): void {
    if (!this.listOfTT.includes(this.activeTT)) {
      this.listOfTT.push(this.activeTT);
    }
    this.clearFields();
  }

  editTT(tt: TransactionTemplate): void {
    this.activeTT = tt;
  }

  clearFields() : void {
    const emptyTT = {} as TransactionTemplate;
    this.activeTT = emptyTT;
  }

  saveTTGroup() : void {
    this.router.navigateByUrl("/ttemplate")

  }

}
