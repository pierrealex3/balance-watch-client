import { Injectable } from '@angular/core';
import { Account } from '../app/account';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  selectedAccount: Account;
  summaryYear: string;
  summaryMonth: string;
  loggedUser: string;

  constructor() {
    this.selectedAccount = null;
    this.summaryYear = '2020';
    this.summaryMonth = '3';    
   }



}
