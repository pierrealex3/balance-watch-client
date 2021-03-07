import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './service-response-wrappers/users-res-wrapper';
import { BASE_URI } from './account-transaction.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountResWrapper } from './service-response-wrappers/account-res-wrapper';
import { UserAccountRights } from './service-response-wrappers/user-account-rights-res-wrapper';

@Injectable({
  providedIn: 'root'
})
export class ReactiveService {

  constructor(private http: HttpClient) { }

  usersFromAuthorizedGroup$: Observable<User[]> = this.http.get<User[]>(BASE_URI + 'users')
  .pipe(
    tap( r => console.log(`authorized users for this group: ${JSON.stringify(r)}`))
  );

  accountsFromAuthorizedGroup$: Observable<AccountResWrapper[]> = this.http.get<AccountResWrapper[]>(BASE_URI + 'accounts')
  .pipe(
    tap( r => console.log(`authorized accounts for this group: ${JSON.stringify(r)}`))
  );

  getUserAccountRights(userId: string, accountId: number): Observable<UserAccountRights> {
    return this.http.get<UserAccountRights>(`${BASE_URI}users/${userId}/accounts/${'' + accountId}/rights`)
    .pipe(
      tap( r => console.log(`user account rights for user:${userId} and account:${'' + accountId} is: ${JSON.stringify(r)}`))
    );
  }

}
