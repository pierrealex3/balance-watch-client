import { Component, OnInit } from '@angular/core';
import { TransactionTemplate } from '../transaction-template';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from '../account-transaction.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { TTMeta } from './tt-meta';
import { globalFrequencyList } from '../frequency/frequency-repo';
import { TTFrequency } from '../frequency/tt-frequency';
import { SessionDataService } from '../session-data.service';
import { TransactionTemplateGroupResWrapper } from '../service-response-wrappers/transaction-template-group-res-wrapper';
import { TransactionTemplateResWrapper } from '../service-response-wrappers/transaction-template-res-wrapper';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-transaction-template-group',
  templateUrl: './transaction-template-group.component.html',
  styleUrls: ['./transaction-template-group.component.css']
})
export class TransactionTemplateGroupComponent implements OnInit {

  displayErrBox: boolean = false;

  name: string;
  ttgId: number;

  activeTT: TTMeta;
  listOfTT: TTMeta[] = [];  
  frequencyList:TTFrequency[] = [];

  seed:number = 0;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionService: AccountTransactionService,
    public sessionDataService: SessionDataService) {
      this.frequencyList = globalFrequencyList;
    }

  ngOnInit() {

    this.ttgId = +this.activatedRoute.snapshot.paramMap.get('id');    
    this.clearFields();

    if (this.ttgId > 0) {
      this.renderEdit();
    }
  }


  saveActiveTT(hookType: NgModel, hookAmount: NgModel, hookWay: NgModel): void {

    if (this.validateTt(hookType, hookAmount, hookWay)) {
      this.listOfTT = this.listOfTT.filter(tt => tt.id != this.activeTT.id);
      this.listOfTT.push(this.activeTT);
  
      this.seed++;
      this.clearFields();
    }

  }

  editTT(tt: TTMeta): void {

    const ttx:TransactionTemplate = 
    {
      'type': tt.data.type,
      'amount': tt.data.amount,
      'way': tt.data.way,
      'account': this.sessionDataService.selectedAccount.id,
      'frequency': tt.data.frequency,
      'note': tt.data.note,
      'accountConnection': tt.data.accountConnection,
      'id': tt.data.id
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

    this.transactionService.addOrUpdateTtGroup( { 'description': this.name, 'account': this.sessionDataService.selectedAccount.id }, this.ttgId>0 ? this.ttgId : undefined).subscribe(
      resp => {
        const ttGroupId: string = this.ttgId>0 ? ''+this.ttgId :resp.headers.get("X-Internal-Id");
        console.log('ttgroupid is: ' + ttGroupId);

        const requestBatch: Observable<HttpResponse<Object>>[] = [];

        this.listOfTT.map(meta => meta.data).forEach(value => {

          let postReq: Observable<HttpResponse<Object>>;
          const reqBody: Object = {
            'type': value.type,
            'amount': value.amount,
            'way': value.way,
            'account': this.sessionDataService.selectedAccount.id,
            'frequency': value.frequency,
            'note': value.note
          };

          if (value.id) {
            postReq = this.transactionService.updateTT(reqBody, value.id);
          } else {
            postReq = this.transactionService.addTt(reqBody, ttGroupId);
          }

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

  goBack() : void {
    this.router.navigateByUrl("/ttemplate/0");
  }

  renderEdit() : void {
    this.transactionService.getAllTtGroups(this.sessionDataService.selectedAccount.id).subscribe( res => {
      let ttgW : TransactionTemplateGroupResWrapper = res.find( value => { return value.id === this.ttgId } );
      this.name = ttgW.data.description;

      this.transactionService.getAllTt(''+this.ttgId).subscribe( resArr => {
        resArr.forEach( res => {          
          this.listOfTT.push( this.buildTtMetaFromTt(res));
          // map 
        });

        // adjust seed - once all ref data is loaded and TTMeta models are built        
        this.activeTT.id = this.seed;
      });

    });
  }

  buildTtMetaFromTt(ttw: TransactionTemplateResWrapper) : TTMeta {
    let ttMeta: TTMeta = new TTMeta(this.mapTTResWrapperToTT(ttw));
    this.mapFreqBeToFreqFe(ttMeta);
    ttMeta.id = this.seed++;
    return ttMeta;
  }

  mapTTResWrapperToTT(ttw: TransactionTemplateResWrapper) : TransactionTemplate {
    let tt : TransactionTemplate = {
      account: ttw.data.account,
      accountConnection: ttw.data.accountConnection,
      amount: ttw.data.amount,
      frequency: ttw.data.frequency,
      id: ttw.id,
      note: ttw.data.note,
      type: ttw.data.type,
      way: ttw.data.way
    }

    return tt;
  }

  /**
   * Maps the frequencyCode obtained from the DTO to its static algo identifier.
   * @param freqCode 
   * @param ttMeta 
   */
  mapFreqBeToFreqFe(ttMeta: TTMeta) : void {
    let freqMatch: TTFrequency = globalFrequencyList.find( freq => freq.regex.test(ttMeta.data.frequency) );
    ttMeta.freqRef = freqMatch;
  }

  validateTt(hookType: NgModel, hookAmount: NgModel, hookWay: NgModel) : boolean {
    console.log('valid type', hookType.valid);
    console.log('valid amount', hookAmount.valid);
    console.log('valid way', hookWay.valid);
    
    let frequencyValid: boolean = this.activeTT.freqRef ? this.activeTT.freqRef.regex.test(''+this.activeTT.data.frequency) : false;
    console.log('valid frequency', frequencyValid);

    if (hookType.valid && hookAmount.valid && hookWay.valid && frequencyValid) {
      this.displayErrBox = false;
      return true;
    } else {
      this.displayErrBox = true;
      return false;
    }    
  }

  /**
   * When the frequency selector changes, we want the existing frequency construct to be blanked.
   */
  onFrequencySelectionChange() : void {
    this.activeTT.data.frequency = '';
  }

}
