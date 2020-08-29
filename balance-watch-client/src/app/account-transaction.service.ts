import { Injectable } from '@angular/core';
import { AccountTransaction } from './account-transaction'
import { MOCK_TRANSACTIONS } from './mock-transactions';
import { Observable, of, forkJoin} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { TransactionTemplateGroup } from './transaction-template-group';
import { TransactionTemplateGroupResWrapper } from './service-response-wrappers/transaction-template-group-res-wrapper';
import { TransactionTemplateResWrapper } from './service-response-wrappers/transaction-template-res-wrapper';
import { TransactionResWrapper } from './service-response-wrappers/transaction-res-wrapper';

const BASE_URI = 'http://localhost:9898/app/'; // TODO export that

@Injectable({
  providedIn: 'root'
})
export class AccountTransactionService {

  constructor(private http: HttpClient) { }

  getTransactions() : Observable<AccountTransaction[]> {
    return of(MOCK_TRANSACTIONS);
  }

  getTransaction(id: number) : Observable<AccountTransaction> {
    return this.http.get<AccountTransaction>(BASE_URI + 'transactions/' + id);
  }

  addTtGroup(ttGroup: TransactionTemplateGroup) : Observable<HttpResponse<Object>> {
    return this.http.post(BASE_URI + 'transactionTemplateGroups', ttGroup, {observe: "response" });
  }

  addTt(tt: Object, ttGroupId: string) : Observable<HttpResponse<Object>> {
    return this.http.post(BASE_URI + 'transactionTemplateGroups/' + ttGroupId + '/templates', tt, {observe: "response"});
  }

  getAllTtGroups(account : string) : Observable<TransactionTemplateGroupResWrapper[]> {
    return this.http.get<TransactionTemplateGroupResWrapper[]>(BASE_URI + 'transactionTemplateGroups?account=' + account, { observe: "body", responseType: "json"});
  }

  getAllTt(groupId: string) : Observable<TransactionTemplateResWrapper[]> {
    return this.http.get<TransactionTemplateResWrapper[]>(BASE_URI + 'transactionTemplateGroups/' + groupId + '/templates', {observe: "body", responseType: "json"});
  }

  generateTransactions(groupId: string, forMonth: string, forYear: string, callbackFn: (value: TransactionResWrapper) => void) : void {

    const fullTransactionObsArr: Observable<TransactionResWrapper[]>[] = [];

    this.getAllTt(groupId).subscribe( ttArr => {
      ttArr.forEach(tt => {
        const transactionArrObservable: Observable<TransactionResWrapper[]> = this.http.get<TransactionResWrapper[]>(BASE_URI + 'xtransactions?year=' + forYear + '&month=' + forMonth + '&ttId=' + tt.id);
        fullTransactionObsArr.push(transactionArrObservable);
      });

      forkJoin( fullTransactionObsArr ).subscribe(
        resp => {
          console.log('how is this different from complete?');
          const flatArray: TransactionResWrapper[] = ([] as TransactionResWrapper[]).concat(...resp);
          flatArray.forEach(callbackFn);        
        }
      );
    });
    
  }

  updateTransaction(t: AccountTransaction, id: number) : Observable<HttpResponse<Object>> {
    const req = {
      date: t.date,
      type: t.type,
      amount: t.amount,
      way: t.way,
      note: t.note,
      noteXtra: t.noteXtra,
      account: t.account,
      accountConnection: t.accountConnection
    }
    return this.http.put<HttpResponse<Object>>(BASE_URI + 'transactions/' + id, req, {observe: "body", responseType: "json"});
  }






}
