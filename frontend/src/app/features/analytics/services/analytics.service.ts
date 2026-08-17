import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Analytic } from '../models/analytic.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  private analyticsSubject = new BehaviorSubject<Analytic[]>([]);
  analytic$ = this.analyticsSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAnalyticsByUser(): Observable<Analytic[]> {
    return this.httpClient.get<Analytic[]>(this.apiUrl);
  }
}
