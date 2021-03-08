import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { catchError, concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { ReactiveService } from 'src/app/reactive.service';
import { UserAccountRightsModel } from 'src/app/service-response-wrappers/user-account-rights-res-wrapper';

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

  private saveRightsSelectedSubject = new Subject<UserAccountRightsModel>()
  saveRightsSelectedAction$ = this.saveRightsSelectedSubject.asObservable()
  .pipe(
    withLatestFrom(this.userSelectedAction$, this.accountSelectedAction$) ,
    concatMap( ([rights, selectedUser, selectedAccount]) => {
      console.log(`About to save rights for user: ${selectedUser} account: ${selectedAccount} and rights: ${JSON.stringify(rights)} `);
      return this.rService.saveUserAccountRights(selectedUser, selectedAccount, rights);
    })
  );

  userAccountRights$ = combineLatest([this.userSelectedAction$, this.accountSelectedAction$])
    .pipe(
      tap(() => console.log('selected account and user')),
      concatMap(([userId, accountId]) => {
        return this.rService.getUserAccountRights(userId, accountId)
          .pipe(
            catchError(err => {
              console.log(`error is: ${JSON.stringify(err)}`);
              if (err.status === 401) {
                return of({
                  exists: false,
                  dto: {
                    isOwner: false,
                    isAdmin: false,
                    isTransfer: false,
                    isRead: false
                  }
                } as UserAccountRightsModel);
              } else {
                return EMPTY;
              }
            }
            )
          );
      })
    );



  constructor(
    private rService: ReactiveService,
    private router: Router
    ) {}

  ngOnInit() {
    this.saveRightsSelectedAction$.subscribe();
  }

  accountSelected(id: number): void {
    console.log(`selected account: ${id}`);
    this.accountSelectedSubject.next(id);
  }

  userSelected(id: string): void {
    console.log(`selected user: ${id}`);
    this.userSelectedSubject.next(id);

  }

  saveRights(accountRights: UserAccountRightsModel): void {
    console.log(`ready to add/update ${JSON.stringify(accountRights)}`);
    this.saveRightsSelectedSubject.next(accountRights);
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }

}
