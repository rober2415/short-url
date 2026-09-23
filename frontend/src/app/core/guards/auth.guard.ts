import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canLoad(): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
