import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LinksService } from 'src/app/core/services/links/links.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements OnInit {
  analytics$= this.analyticsService.analytics$;
  urls$ = this.linksService.links$;
  isLoading$ = this.linksService.isLoading$;

  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private linksService: LinksService,
  ) {}

  ngOnInit(): void {
    const userId = this.authService.userId;

    if (!userId) {
      return;
    }

    this.analyticsService.getAnalyticsByUser().subscribe();
    this.linksService.getUserLinks().subscribe();
  }
}
