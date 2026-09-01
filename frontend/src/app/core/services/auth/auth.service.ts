import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthUser, CurrentUser } from 'src/app/core/models/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly sessionExpiredStorageKey = 'session_expired';

  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(this.getInitialUserFromStorage());
  public readonly currentUser$ = this.currentUserSubject.asObservable();

  public readonly isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(map((user) => !!user && this.hasToken()));
  public readonly isAdmin$: Observable<boolean> = this.currentUser$.pipe(map((user) => !!user?.roles?.includes('admin')));

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    if (this.isLoggedIn()) {
      this.fetchUserProfile().subscribe();
    }
  }

  getUserName(): string {
    return localStorage.getItem('user_name') || '';
  }

  getUserId(): number | null {
    const userIdStr = localStorage.getItem('user_id');
    return userIdStr ? parseInt(userIdStr, 10) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasRole(role: string): boolean {
    const roles: string[] = JSON.parse(
      localStorage.getItem('user_roles') || '[]',
    );
    return roles.includes(role);
  }

  isAdmin(): boolean {
    return this.hasRole('admin') || this.hasRole('support');
  }

  consumeSessionExpiredFlag(): boolean {
    const isExpired =
      sessionStorage.getItem(this.sessionExpiredStorageKey) === '1';
    if (isExpired) {
      sessionStorage.removeItem(this.sessionExpiredStorageKey);
    }
    return isExpired;
  }

  login(credentials: AuthUser): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        const user = this.formatUser(response.user);
        this.setSession(response.token, user);
        this.router.navigate(['/']);
      }),
    );
  }

  register(userData: AuthUser): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, userData);
  }

  fetchUserProfile(): Observable<CurrentUser | null> {
    if (!this.isLoggedIn()) {
      this.clearSession();
      return of(null);
    }

    return this.httpClient.get<any>(`${this.apiUrl}/user`).pipe(
      map((res) => this.formatUser(res?.user ?? res)),
      tap((user) => this.updateUserSession(user)),
      catchError((error) => {
        if (error.status === 401) {
          this.logout(true);
        }
        return of(null);
      }),
    );
  }

  logout(sessionExpired = false): void {
    if (sessionExpired) {
      sessionStorage.setItem(this.sessionExpiredStorageKey, '1');
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: CurrentUser): void {
    localStorage.setItem('auth_token', token);
    this.updateUserSession(user);
  }

  private updateUserSession(user: CurrentUser): void {
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('user_id', user.id.toString());
    localStorage.setItem('user_roles', JSON.stringify(user.roles));
    this.currentUserSubject.next(user);
  }

  private clearSession(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_roles');
    this.currentUserSubject.next(null);
  }

  private getInitialUserFromStorage(): CurrentUser | null {
    if (!this.isLoggedIn()) return null;
    try {
      const storedRoles = localStorage.getItem('user_roles');
      const roles = storedRoles ? JSON.parse(storedRoles) : [];
      const id = localStorage.getItem('user_id');
      const name = localStorage.getItem('user_name') || '';

      return {
        id: id ? parseInt(id, 10) : 0,
        name,
        roles: Array.isArray(roles) ? roles : [],
      };
    } catch {
      return null;
    }
  }

  private formatUser(user: any): CurrentUser {
    return {
      id: user?.id ?? 0,
      name: user?.name ?? '',
      roles: Array.isArray(user?.roles) ? user.roles : [],
    };
  }
}
