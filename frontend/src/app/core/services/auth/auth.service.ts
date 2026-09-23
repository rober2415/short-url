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
  private apiUrl = environment.apiUrl;
  private sessionExpiredKey = 'session_expired';

  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map((user) => !!user && this.hasToken)
  );

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map((user) => ['admin', 'support'].some((role) => user?.roles.includes(role)))
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get user(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  get userId(): number | null {
    return this.user?.id ?? null;
  }

  get isLoggedIn(): boolean {
    return !!this.user && this.hasToken;
  }

  get isAdmin(): boolean {
    return ['admin', 'support'].some((role) => this.user?.roles.includes(role));
  }

  get hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  initializeAuth(): Observable<CurrentUser | null> {
    return this.hasToken ? this.fetchUserProfile() : of(null);
  }

  fetchUserProfile(): Observable<CurrentUser | null> {
    if (!this.hasToken) {
      this.logout();
      return of(null);
    }

    return this.http.get<any>(`${this.apiUrl}/user`).pipe(
      map((res) => this.formatUser(res?.user ?? res)),
      tap((user) => this.currentUserSubject.next(user)),
      catchError((error) => {
        if (error.status === 401) this.logout(true);
        return of(null);
      })
    );
  }

  login(credentials: AuthUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('auth_token', res.token);
        this.currentUserSubject.next(this.formatUser(res.user));
        this.router.navigate(['/']);
      })
    );
  }

  register(userData: AuthUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout(sessionExpired = false): void {
    if (sessionExpired) {
      sessionStorage.setItem(this.sessionExpiredKey, '1');
    }
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  consumeSessionExpiredFlag(): boolean {
    const expired = sessionStorage.getItem(this.sessionExpiredKey) === '1';
    if (expired) sessionStorage.removeItem(this.sessionExpiredKey);
    return expired;
  }

  private formatUser(user: any): CurrentUser {
    return {
      id: user?.id ?? 0,
      name: user?.name ?? '',
      roles: Array.isArray(user?.roles) ? user.roles : [],
    };
  }
}
