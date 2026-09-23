import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analytic } from '../models/analytic.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  private analyticsSubject = new BehaviorSubject<Analytic[]>([]);
  analytics$ = this.analyticsSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAnalyticsByUser(): Observable<Analytic[]> {
    return this.httpClient.get<Analytic[]>(this.apiUrl).pipe(
      tap((analytics) => this.analyticsSubject.next(analytics)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
