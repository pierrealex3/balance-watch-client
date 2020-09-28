import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import { AppComponent } from './app.component';
import { AccountSummaryGridComponent } from './account-summary-grid/account-summary-grid.component';
import { AccountTransactionDetailsComponent } from './account-transaction-details/account-transaction-details.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountTransactionTemplateComponent } from './account-transaction-template/account-transaction-template.component';
import { TransactionTemplateGroupComponent } from './transaction-template-group/transaction-template-group.component';
import { TtGroupSummaryComponent } from './tt-group-summary/tt-group-summary.component';
import { EmdomComponent } from './frequency/emdom/emdom.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMaterialModule} from './material-module';
import { AccountsHomeComponent } from './accounts-home/accounts-home.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SomHomeComponent } from './som-home/som-home.component';
import { CurrencyPipe } from '@angular/common';
import { MonthSelectorComponent } from './month-selector/month-selector.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { EwdowComponent } from './frequency/ewdow/ewdow.component';
import { ExwdowComponent } from './frequency/exwdow/exwdow.component';
import { SimpleDowComponent } from './frequency/commons/simple-dow/simple-dow.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountSummaryGridComponent,
    AccountTransactionDetailsComponent,
    AccountTransactionTemplateComponent,
    TransactionTemplateGroupComponent,
    TtGroupSummaryComponent,
    EmdomComponent,
    AccountsHomeComponent,
    AccountEditComponent,
    SomHomeComponent,
    MonthSelectorComponent,    
    EwdowComponent, ExwdowComponent, SimpleDowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
