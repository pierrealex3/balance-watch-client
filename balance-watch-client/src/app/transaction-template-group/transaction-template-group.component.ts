import { Component, OnInit } from '@angular/core';
import { TransactionTemplate } from '../transaction-template';
import { Router } from '@angular/router';
import { AccountTransactionService } from '../account-transaction.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TTMeta } from './tt-meta';
import { globalFrequencyList } from '../frequency/frequency-repo';
import { TTFrequency } from '../frequency/tt-frequency';

@Component({
  selector: 'app-transaction-template-group',
  templateUrl: './transaction-template-group.component.html',
  styleUrls: ['./transaction-template-group.component.css']
})
export class TransactionTemplateGroupComponent implements OnInit {

  name: string;
  activeTT: TTMeta;
  listOfTT: TTMeta[] = [];  
  frequencyList:TTFrequency[] = [];

  seed:number = 0;

  constructor(private router: Router,
    private transactionService: AccountTransactionService) {
      this.frequencyList = globalFrequencyList;
    }

  ngOnInit() {
    this.clearFields();    
  }

  saveActiveTT(): void {
    this.listOfTT = this.listOfTT.filter(tt => tt.id != this.activeTT.id);
    this.listOfTT.push(this.activeTT);

    this.seed++;
    this.clearFields();
  }

  editTT(tt: TTMeta): void {

    const ttx:TransactionTemplate = 
    {
      'type': tt.data.type,
      'amount': tt.data.amount,
      'way': tt.data.way,
      'account': 'ABC123',  // TODO adapt
      'frequency': tt.data.frequency,
      'note': tt.data.note,
      'accountConnection': tt.data.accountConnection,
      'id': tt.data.id  // TODO re-think this param
    }

    const ttm:TTMeta = new TTMeta(ttx);
    ttm.id = tt.id;
    ttm.freqRef = tt.freqRef;

    this.activeTT = ttm;
  }

  clearFields() : void {
    const emptyTT = {} as TransactionTemplate;
    const ttMeta = new TTMeta(emptyTT);
    ttMeta.id = this.seed;
    ttMeta.freqRef = null;
    this.activeTT = ttMeta;
  }

  saveTTGroup() : void {

    this.transactionService.addTtGroup( { 'description': this.name, 'account': 'ABC123' }).subscribe(
      resp => {
        const ttGroupId: string = resp.headers.get("X-Internal-Id");
        console.log('ttgroupid is: ' + ttGroupId);

        const requestBatch: Observable<HttpResponse<Object>>[] = [];

        this.listOfTT.map(meta => meta.data).forEach(value => {

          const postReq: Observable<HttpResponse<Object>> = this.transactionService.addTt(
            {
              'type': value.type,
              'amount': value.amount,
              'way': value.way,
              'account': 'ABC123',  // TODO adapt
              'frequency': value.frequency,
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

  getEmDomDesc() : string {
    return this.frequencyList.find( f => { f.code === 'em-dom' } ).description;
  }

  activeTTExists() : boolean {
    return this.listOfTT.filter(tt => tt.id == this.activeTT.id).length > 0;
  }

}
