import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AccountSummaryGridComponent } from './account-summary-grid/account-summary-grid.component';
import { AccountTransactionDetailsComponent } from './account-transaction-details/account-transaction-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountTransactionTemplateComponent } from './account-transaction-template/account-transaction-template.component';
import { TransactionTemplateGroupComponent } from './transaction-template-group/transaction-template-group.component';
import { TtGroupSummaryComponent } from './tt-group-summary/tt-group-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountSummaryGridComponent,
    AccountTransactionDetailsComponent,
    AccountTransactionTemplateComponent,
    TransactionTemplateGroupComponent,
    TtGroupSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
