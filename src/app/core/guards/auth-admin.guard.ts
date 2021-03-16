import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { AuthService } from '../../core/api/auth/auth.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.hasLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/admin-4040/auth/login']);
      return false;
    }
  }
}
