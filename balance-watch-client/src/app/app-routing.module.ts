import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryGridComponent } from './account-summary-grid/account-summary-grid.component';
import { AccountTransactionDetailsComponent } from './account-transaction-details/account-transaction-details.component';
import { AccountTransactionTemplateComponent } from './account-transaction-template/account-transaction-template.component';
import { TransactionTemplateGroupComponent } from './transaction-template-group/transaction-template-group.component';
import { AccountsHomeComponent } from './accounts-home/accounts-home.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SomHomeComponent } from './som-home/som-home.component';

const routes:Routes = [
  {path: 'tsummary', component: AccountSummaryGridComponent},
  {path: 'tdetail/:id', component: AccountTransactionDetailsComponent},
  {path: 'ttemplate/:id', component: AccountTransactionTemplateComponent},
  {path: 'ttgroup/:id', component: TransactionTemplateGroupComponent},
  {path: 'accounts', component: AccountsHomeComponent},
  {path: 'accountDetail/:id', component: AccountEditComponent},
  {path: 'som/:year/:month/:account', component: SomHomeComponent},
  {path: '', redirectTo:'tsummary', pathMatch: 'full'}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
