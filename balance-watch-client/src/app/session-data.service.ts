import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Account } from '../app/account';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  selectedAccount: Account;
  summaryYear: string;
  summaryMonth: string;

  authenticatedUser: ReplaySubject<string>;  

  constructor() {
    this.selectedAccount = null;
    this.summaryYear = '2020';
    this.summaryMonth = '3';
    this.authenticatedUser = new ReplaySubject(1);    
   }   



}
