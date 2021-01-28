import { Injectable } from '@angular/core';
import { AccountTransaction } from './account-transaction'
import { Observable, of, forkJoin} from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { TransactionTemplateGroup } from './transaction-template-group';
import { TransactionTemplateGroupResWrapper } from './service-response-wrappers/transaction-template-group-res-wrapper';
import { TransactionTemplateResWrapper } from './service-response-wrappers/transaction-template-res-wrapper';
import { TransactionResWrapper } from './service-response-wrappers/transaction-res-wrapper';
import { AccountResWrapper } from './service-response-wrappers/account-res-wrapper';
import { Account } from './account';
import { MatMultiYearView } from '@angular/material/datepicker';
import { TBoard } from './tboard';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

const BASE_URI = 'http://localhost:9897/mds/'; // This is the proxy-pass PORT

@Injectable({
  providedIn: 'root'
})
export class AccountTransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(year: string, month: string, account: number, callbackFn: (value: TransactionResWrapper) => void, callbackFnForTransactionSet?: (value: number) => void): void {
    const ot: Observable<TransactionResWrapper[]> = this.http.get<TransactionResWrapper[]>(BASE_URI + 'transactions?year=' + year + '&month=' + month + '&account=' + account);
    ot.subscribe((t) => {
      let submittedNb: number = t.filter((tt) => tt.data.flagSubmitted).length;
      if (callbackFnForTransactionSet != undefined) {
        callbackFnForTransactionSet(submittedNb);
      }
      t.forEach(callbackFn)
    });
  }

  getTransaction(id: number) : Observable<AccountTransaction> {
    return this.http.get<AccountTransaction>(BASE_URI + 'transactions/' + id);
  }

  /**
   * Convenient bridge for callers.
   * @param ttGroup 
   * @param ttGroupId 
   */
  addOrUpdateTtGroup(ttGroup: TransactionTemplateGroup, ttGroupId?: number) {
    if (ttGroupId) { 
      return this.updateTtGroup(ttGroup, ttGroupId);
    } else {
      return this.addTtGroup(ttGroup);
    }
  }

  addTtGroup(ttGroup: TransactionTemplateGroup) : Observable<HttpResponse<Object>> {
    return this.http.post(BASE_URI + 'transactionTemplateGroups', ttGroup, {observe: "response" });
  }

  updateTtGroup(ttGroup: TransactionTemplateGroup, ttGroupId: number) : Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(BASE_URI + 'transactionTemplateGroups/' + ttGroupId, ttGroup, {observe: "response"});
  }

  addTt(tt: Object, ttGroupId: string) : Observable<HttpResponse<Object>> {
    return this.http.post(BASE_URI + 'transactionTemplateGroups/' + ttGroupId + '/templates', tt, {observe: "response"});
  }

  updateTT(tt: Object, ttId: number) : Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(BASE_URI + 'transactionsTemplates/' + ttId, tt, {observe: "response"});
  }

  getAllTtGroups(account : number) : Observable<TransactionTemplateGroupResWrapper[]> {
    return this.http.get<TransactionTemplateGroupResWrapper[]>(BASE_URI + 'transactionTemplateGroups?account=' + account, { observe: "body", responseType: "json"});
  }

  getAllTt(groupId: string) : Observable<TransactionTemplateResWrapper[]> {
    return this.http.get<TransactionTemplateResWrapper[]>(BASE_URI + 'transactionTemplateGroups/' + groupId + '/templates', {observe: "body", responseType: "json"});
  }

  generateTransactions(groupId: string, forMonth: string, forYear: string, callbackFn: () => void) : void {

    const fullTransactionObsArr: Observable<TransactionResWrapper[]>[] = [];

    this.getAllTt(groupId).subscribe( ttArr => {
      ttArr.forEach(tt => {
        const transactionArrObservable: Observable<TransactionResWrapper[]> = this.http.get<TransactionResWrapper[]>(BASE_URI + 'xtransactions?year=' + forYear + '&month=' + forMonth + '&ttId=' + tt.id);
        fullTransactionObsArr.push(transactionArrObservable);
      });

      forkJoin( fullTransactionObsArr ).subscribe(
        resp => {
          console.log('forkJoin resp from account-transaction-service');
          const flatArray: TransactionResWrapper[] = ([] as TransactionResWrapper[]).concat(...resp);
          console.log('xtransactions generated = ' + flatArray.length);
          callbackFn();        
        }
      );
    });
    
  }

  getAllAccounts(userId : string) : Observable<AccountResWrapper[]> {
    return this.http.get<AccountResWrapper[]>(BASE_URI + 'users/' + userId + '/accounts', { observe: "body", responseType: "json"});
  }

  getAllRelatedAccounts(userId : string) : Observable<AccountResWrapper[]> {
    return this.http.get<AccountResWrapper[]>(BASE_URI + 'users/' + userId + '/relatedAccounts', { observe: "body", responseType: "json"});
  }

  getAccount(accountId: number) : Observable<AccountResWrapper> {
    return this.http.get<AccountResWrapper>(BASE_URI + 'accounts/' + accountId, {observe: "body", responseType: "json"});
  }

  addAccount(userId: string, account: Account) : Observable<HttpResponse<Object>> {
    const req = {
      accountNumber: account.accountNumber,
      desc: account.desc
    };
    return this.http.post<HttpResponse<Object>>(BASE_URI + 'users/' + userId + '/accounts', req, {observe: "body", responseType:"json"});
  }

  updateAccount(account: Account) : Observable<HttpResponse<Object>> {
    const req = {
      accountNumber: account.accountNumber,
      desc: account.desc
    };
    return this.http.put<HttpResponse<Object>>(BASE_URI + 'accounts/' + account.id, req, {observe: "body", responseType: "json"});
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

  addTransaction(t: AccountTransaction) : Observable<HttpResponse<Object>> {
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
    return this.http.post<HttpResponse<Object>>(BASE_URI + 'transactions', req, {observe: "body", responseType: "json"});
  }

  deleteTransaction(tid: number) : Observable<HttpResponse<Object>> {
    return this.http.delete<HttpResponse<Object>>(BASE_URI + 'transactions/' + tid, {observe: "response"});
  }

  addSomBalance(somBalance: number, year: number, month: number, account: number, startAmtMan: boolean) : Observable<HttpResponse<Object>> {
    const req = {
      year: year,
      month: month,
      startAmt: somBalance,
      account: account,
      startAmtMan: startAmtMan
    };
    return this.http.post<HttpResponse<Object>>(BASE_URI + 'transactionBoards', req, {observe: "body", responseType: "json"});
  }

  /**
   * Update transaction board is quite special because its has a composite primary key which is a subset of its data members.
   * @param req 
   */
  updSomBalance(req: TBoard) : Observable<HttpResponse<Object>> {
    return this.http.put<HttpResponse<Object>>(BASE_URI + 'transactionBoards', req, {observe: "body", responseType: "json"});
  }

  getTBoard(year: number, month: number, account: number) : Observable<TBoard> {
    return this.http.get<TBoard>(BASE_URI + 'transactionBoards/' + year + '/' + month + '/' + account, {observe: "body", responseType: "json"});
  }

  addUser(userId: string) : Observable<HttpResponse<Object>> {
    const req = {
      id: userId
    };
    return this.http.post<HttpResponse<Object>>(BASE_URI + 'users', req, {observe: "body", responseType: "json"});
  }

}
