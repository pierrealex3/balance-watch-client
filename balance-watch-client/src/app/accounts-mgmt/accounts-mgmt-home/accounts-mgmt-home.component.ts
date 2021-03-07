import { Component, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { ReactiveService } from 'src/app/reactive.service';

@Component({
  selector: 'app-accounts-mgmt-home',
  templateUrl: './accounts-mgmt-home.component.html',
  styleUrls: ['./accounts-mgmt-home.component.css']
})
export class AccountsMgmtHomeComponent implements OnInit {

  private userSelectedSubject = new Subject<string>();
  userSelectedAction$ = this.userSelectedSubject.asObservable();

  private accountSelectedSubject = new Subject<number>();
  accountSelectedAction$ = this.accountSelectedSubject.asObservable();

  userAccountRights$ = combineLatest( [this.userSelectedAction$, this.accountSelectedAction$] )
  .pipe(
    concatMap(([userId, accountId]) => this.rService.getUserAccountRights(userId, accountId)) ,
//    tap( (userId, accountId) => console.log(`selected account:${'' + accountId} and user: ${userId}`) )
    tap( () => console.log('selected account and user') )

  );


  constructor(private rService: ReactiveService) { }

  ngOnInit() {
  }

  accountSelected(id: number): void {
    console.log(`selected account: ${id}`);
    this.accountSelectedSubject.next(id);
  }

  userSelected(id: string): void {
    console.log(`selected user: ${id}`);
    this.userSelectedSubject.next(id);

  }

}
