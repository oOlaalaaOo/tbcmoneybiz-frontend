import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation-header',
  templateUrl: './user-navigation-header.component.html',
  styleUrls: ['./user-navigation-header.component.scss'],
})
export class UserNavigationHeaderComponent implements OnInit {
  public menus: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.menus = [
      {
        label: 'TBC Money Biz',
        title: 'TBC Money Biz',
        id: 'home',
        url: '/user/dashboard',
      },
      {
        label: 'Dashboard',
        id: 'dashboard',
        icon: 'pi pi-fw pi-th-large',
        url: '/user/dashboard',
      },
      // {
      //   label: 'Cashout',
      //   icon: 'pi pi-fw pi-money-bill',
      //   id: 'cashout',
      //   url: '/user/cashout',
      // },
      // {
      //   label: 'Downlines',
      //   icon: 'pi pi-fw pi-users',
      //   id: 'downlines',
      //   url: '/user/downlines',
      // },
      {
        label: 'Account',
        icon: 'pi pi-fw pi-cog',
        id: 'account',
        url: '/user/account',
      },
    ];
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/user/auth/login']);
  }
}
