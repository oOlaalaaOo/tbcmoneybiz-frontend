import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navigation-header',
  templateUrl: './admin-navigation-header.component.html',
  styleUrls: ['./admin-navigation-header.component.scss'],
})
export class AdminNavigationHeaderComponent implements OnInit {
  public menus: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.menus = [
      // {
      //   label: 'Project-30 International',
      //   title: 'Project-30 International',
      //   id: 'home',
      // },
      {
        label: 'Dashboard',
        id: 'dashboard',
        icon: 'pi pi-fw pi-th-large',
        url: '/admin-4040/dashboard',
      },
      {
        label: 'Memberships',
        icon: 'pi pi-fw pi-id-card',
        id: 'memberships',
        url: '/admin-4040/memberships',
      },
      {
        label: 'Members',
        icon: 'pi pi-fw pi-users',
        id: 'member',
        url: '/admin-4040/members',
      },
      {
        label: 'Cashouts',
        icon: 'pi pi-fw pi-money-bill',
        id: 'cashouts',
        url: '/admin-4040/cashouts',
      },
      // {
      //   label: 'Account',
      //   icon: 'pi pi-fw pi-cog',
      //   items: [
      //     { label: 'Profile', icon: 'pi pi-fw pi-user', id: 'account-profile' },
      //     {
      //       label: 'Downlines',
      //       icon: 'pi pi-fw pi-users',
      //       id: 'account-downlines',
      //     },
      //     {
      //       separator: true,
      //     },
      //     {
      //       label: 'Logout',
      //       icon: 'pi pi-fw pi-sign-out',
      //       id: 'account-logout',
      //     },
      //   ],
      //   id: 'account',
      // },
    ];
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/admin-4040/auth/login']);
  }
}
