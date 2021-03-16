import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { MembersComponent } from './members/members.component';
import { CashoutsComponent } from './cashouts/cashouts.component';

@NgModule({
  declarations: [DashboardComponent, MembershipsComponent, MembersComponent, CashoutsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CoreModule,
  ],
})
export class AdminModule {}
