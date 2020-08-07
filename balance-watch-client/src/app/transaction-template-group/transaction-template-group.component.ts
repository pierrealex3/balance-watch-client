import { Component, OnInit } from '@angular/core';
import { TransactionTemplate } from '../transaction-template';
import { Router } from '@angular/router';
import { AccountTransactionService } from '../account-transaction.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FrequencyResWrapper } from '../service-response-wrappers/frequency-res-wrapper';

@Component({
  selector: 'app-transaction-template-group',
  templateUrl: './transaction-template-group.component.html',
  styleUrls: ['./transaction-template-group.component.css']
})
export class TransactionTemplateGroupComponent implements OnInit {

  name: string;
  activeTT: TransactionTemplate;
  listOfTT: TransactionTemplate[] = [];  
  listOfFrequencies: FrequencyResWrapper[] = [];

  constructor(private router: Router,
    private transactionService: AccountTransactionService) { }

  ngOnInit() {
    this.clearFields();
    this.loadFrequencyList();
  }

  loadFrequencyList(): void {
    this.transactionService.getAllFrequencies().subscribe( frequencies => { this.listOfFrequencies = frequencies; });
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
    emptyTT.frequencyList = new Array<FrequencyResWrapper>(1);
    this.activeTT = emptyTT;
  }

  saveTTGroup() : void {

    this.transactionService.addTtGroup( { 'description': this.name, 'account': 'ABC123' }).subscribe(
      resp => {
        const ttGroupId: string = resp.headers.get("X-Internal-Id");
        console.log('ttgroupid is: ' + ttGroupId);

        const requestBatch: Observable<HttpResponse<Object>>[] = [];

        this.listOfTT.forEach(value => {
          console.log('processing: ' + value.type + ' ' + value.way);

          const postReq: Observable<HttpResponse<Object>> = this.transactionService.addTt(
            {
              'type': value.type,
              'amount': value.amount,
              'way': value.way,
              'account': 'ABC123',  // TODO adapt
              'frequencies': value.frequencyList.map( (f) => f.id ) ,
              'note': value.note
            },
            ttGroupId
          );

          requestBatch.push(postReq);
        });

        forkJoin( requestBatch ).subscribe({
          next: resp => {
            console.log('how is this different from complete?');
          },
          complete: () => {
            console.log('complete!');
            this.router.navigateByUrl("/ttemplate/" + ttGroupId);
          },
          error: (err) => {
            console.log('error is: ' + err)
          }
        });

        
      }
    );


  }

}
