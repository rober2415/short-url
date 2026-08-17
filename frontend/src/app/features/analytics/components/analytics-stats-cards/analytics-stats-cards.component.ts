import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Analytic } from '../../models/analytic.interface';
import { AnalyticsSummary } from '../../models/analytics-summary';
import { Link } from 'src/app/core/models/link.interface';

@Component({
  selector: 'app-analytics-stats-cards',
  templateUrl: './analytics-stats-cards.component.html',
  styleUrls: ['./analytics-stats-cards.component.scss'],
})
export class AnalyticsStatsCardsComponent implements OnChanges {
  @Input() analytics: Analytic[] = [];
  @Input() urls: Link[] = [];

  summary: AnalyticsSummary = {
    totalClicks: 0,
    countriesCount: 0,
    topDevice: 'N/A',
    topSource: 'N/A',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['analytics'] || changes['urls']) {
      this.summary = this.buildSummary(this.analytics, this.urls);
    }
  }

  private buildSummary(
    items: Analytic[],
    urls: Link[] = [],
  ): AnalyticsSummary {
    const totalClicks = urls.reduce(
      (sum, url) => sum + Number(url.click_count ?? 0),
      0,
    );
    const countriesCount = new Set(items.map((item) => item.country)).size;

    const deviceCounts = items.reduce<Record<string, number>>((acc, item) => {
      const key = item.device || 'Unknown';
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    const sourceCounts = items.reduce<Record<string, number>>((acc, item) => {
      const key = item.referer || 'Direct';
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    const topDevice =
      Object.entries(deviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';
    const topSource =
      Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

    return {
      totalClicks,
      countriesCount,
      topDevice,
      topSource,
    };
  }
}
