import { Component, OnInit } from '@angular/core';
import { AccountTransactionService } from './account-transaction.service';
import { KeycloakService } from './keycloak.service';
import { SessionDataService } from './session-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Balance Watch';

  constructor(public sessionDataService: SessionDataService, private keycloakService: KeycloakService, private accountTransactionService: AccountTransactionService){}
  
  ngOnInit(): void {
    var d = new Date();
    this.sessionDataService.summaryYear = "" + d.getFullYear();
    this.sessionDataService.summaryMonth = "" + (d.getMonth()+1);
    
    const authUser = this.keycloakService.getAuthenticatedUser();
    console.log("logged user is:" + authUser);

    this.accountTransactionService.addUser(authUser).subscribe((httpRes) => {
      this.sessionDataService.authenticatedUser.next(authUser);
    }, () => {
      // TODO error handler => should redirect to "we're sorry" page
    });
  }

  logout() : void {
    this.keycloakService.logout();
  }
}
