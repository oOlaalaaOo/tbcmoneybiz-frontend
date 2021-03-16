import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthAdminGuard } from '../../core/guards/auth-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { MembersComponent } from './members/members.component';
import { CashoutsComponent } from './cashouts/cashouts.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'memberships',
    component: MembershipsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'cashouts',
    component: CashoutsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
