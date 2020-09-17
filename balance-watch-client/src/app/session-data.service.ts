import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  selAccount: string;
  summaryYear: string;
  summaryMonth: string;
  loggedUser: string;

  constructor() {
    this.selAccount = "ABC123";
    this.summaryYear = '2020';
    this.summaryMonth = '3';
   }



}
