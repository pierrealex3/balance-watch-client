import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSummaryGridComponent } from './account-summary-grid/account-summary-grid.component';
import { AccountTransactionDetailsComponent } from './account-transaction-details/account-transaction-details.component';
import { AccountTransactionTemplateComponent } from './account-transaction-template/account-transaction-template.component';

const routes:Routes = [
  {path: 'tsummary', component: AccountSummaryGridComponent},
  {path: 'tdetail/:id', component: AccountTransactionDetailsComponent},
  {path: 'ttemplate', component: AccountTransactionTemplateComponent},
  {path: '', redirectTo:'tsummary', pathMatch: 'full'}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
