import { Injectable } from '@angular/core';
import { AccountTransaction } from './account-transaction'
import { MOCK_TRANSACTIONS } from './mock-transactions';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountTransactionService {

  constructor() { }

  getTransactions() : Observable<AccountTransaction[]> {
    return of(MOCK_TRANSACTIONS);
  }

  getTransaction(id: number) : Observable<AccountTransaction> {
    return of(MOCK_TRANSACTIONS.find(value => value.id === id));
  }
}
