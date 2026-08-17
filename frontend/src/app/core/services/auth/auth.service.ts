import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthUser } from 'src/app/core/models/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.refreshAuthState();

    window.addEventListener('storage', () => {
      this.refreshAuthState();
    });

    window.addEventListener('focus', () => {
      this.refreshAuthState();
    });
  }

  getUserName(): string {
    return localStorage.getItem('user_name') || '';
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('user_id');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }

  register(userData: AuthUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: AuthUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_name', response.user?.name ?? '');
        localStorage.setItem('user_id', response.user?.id?.toString() ?? '');
        this.updateAuthState(true);
        this.router.navigate(['/']);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    this.updateAuthState(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  public refreshAuthState(): void {
    const isAuthenticated = this.hasToken();
    this.updateAuthState(isAuthenticated);

    if (!isAuthenticated && this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }

  private updateAuthState(isAuthenticated: boolean): void {
    this.loggedIn.next(isAuthenticated);
  }
}
