import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountSummaryGridComponent } from './account-summary-grid/account-summary-grid.component';
import { AccountTransactionDetailsComponent } from './account-transaction-details/account-transaction-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountTransactionTemplateComponent } from './account-transaction-template/account-transaction-template.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountSummaryGridComponent,
    AccountTransactionDetailsComponent,
    AccountTransactionTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
