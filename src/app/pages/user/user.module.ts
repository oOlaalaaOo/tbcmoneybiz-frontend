import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { CashoutComponent } from './cashout/cashout.component';

@NgModule({
  declarations: [DashboardComponent, AccountComponent, CashoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CoreModule,
  ],
})
export class UserModule {}
