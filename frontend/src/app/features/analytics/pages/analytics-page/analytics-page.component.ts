import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Analytic } from '../../models/analytic.interface';
import { AnalyticsService } from '../../services/analytics.service';
import { ShortenerService } from '../../../shortener/services/shortener.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Link } from 'src/app/core/models/link.interface';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  analytics: Analytic[] = [];
  urls: Link[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private shortenerService: ShortenerService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.warn('No user ID found in session');
      return;
    }

    forkJoin({
      analytics: this.analyticsService.getAnalyticsByUser(),
      urls: this.shortenerService.getUrls(),
    }).subscribe({
      next: ({ analytics, urls }) => {
        this.analytics = analytics;
        this.urls = urls;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading analytics page data', err);
        this.isLoading = false;
      },
    });
  }
}
