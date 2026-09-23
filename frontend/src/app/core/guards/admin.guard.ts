import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canLoad(): boolean | UrlTree {
    if (this.authService.isLoggedIn && this.authService.isAdmin) {
      return true;
    }
    return this.router.parseUrl('/');
  }
}
