import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { catchError, concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { ReactiveService } from 'src/app/reactive.service';
import { UserAccountRightsModel } from 'src/app/service-response-wrappers/user-account-rights-res-wrapper';
import { ToastrWrapperService } from 'src/app/toastr-wrapper.service';

@Component({
  selector: 'app-accounts-mgmt-home',
  templateUrl: './accounts-mgmt-home.component.html',
  styleUrls: ['./accounts-mgmt-home.component.css']
})
export class AccountsMgmtHomeComponent implements OnInit {

  /* IMPORTANT NOTE: those click-event trackers used for counter a css-problem with the user and
   * account HTML lists prevent this class from being *FULLY REACTIVE*
   */
  private userActiveIdx = -1;
  private accountActiveIdx = -1;

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
      return this.rService.saveUserAccountRights(selectedUser, selectedAccount, rights)
      .pipe(
        catchError(() => {
          this.toastr.error(`The Account Rights cannot be saved.  Please contact technical support for assistance.`);
          return EMPTY;
        }) ,
        tap(() => {
          this.toastr.success(`Saved the Account Rights`);
          this.userSelectedSubject.next(selectedUser);  // note: this call does re-trigger the (user AND account) action stream Observer
        }
        )
      );
    })
  );

  userAccountRights$ = combineLatest([this.userSelectedAction$, this.accountSelectedAction$]) // (user AND account) action stream Observer
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
    private router: Router,
    private toastr: ToastrWrapperService
    ) {}

  ngOnInit() {
    this.saveRightsSelectedAction$.subscribe();
  }

  accountSelected(id: number, idx: number): void {
    console.log(`selected account: ${id}`);
    this.accountSelectedSubject.next(id);
    this.accountActiveIdx = idx;
  }

  userSelected(id: string, idx: number): void {
    console.log(`selected user: ${id}`);
    this.userSelectedSubject.next(id);
    this.userActiveIdx = idx;
  }

  saveRights(accountRights: UserAccountRightsModel): void {
    console.log(`ready to add/update ${JSON.stringify(accountRights)}`);
    this.saveRightsSelectedSubject.next(accountRights);
  }

  goBack(): void {
    this.router.navigate(['/accounts']);
  }

}
