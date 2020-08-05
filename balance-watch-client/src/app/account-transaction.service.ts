import { Injectable } from '@angular/core';
import { AccountTransaction } from './account-transaction'
import { MOCK_TRANSACTIONS } from './mock-transactions';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { TransactionTemplateGroup } from './transaction-template-group';
import { TransactionTemplateGroupResWrapper } from './service-response-wrappers/transaction-template-group-res-wrapper';

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
    return of(MOCK_TRANSACTIONS.find(value => value.id === id));
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






}
