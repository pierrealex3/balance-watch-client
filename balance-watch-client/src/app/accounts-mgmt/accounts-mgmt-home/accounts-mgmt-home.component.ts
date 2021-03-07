import { Component, OnInit } from '@angular/core';
import { combineLatest, EMPTY, of, Subject } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
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
