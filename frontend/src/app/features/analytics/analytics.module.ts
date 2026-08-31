import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsStatsCardsComponent } from './components/analytics-stats-cards/analytics-stats-cards.component';
import { AnalyticsTableComponent } from './components/analytics-table/analytics-table.component';
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';

@NgModule({
  declarations: [
    AnalyticsStatsCardsComponent,
    AnalyticsTableComponent,
    AnalyticsPageComponent,
  ],
  imports: [CommonModule, AnalyticsRoutingModule, SharedModule],
  exports: [
    AnalyticsStatsCardsComponent,
    AnalyticsTableComponent,
    AnalyticsPageComponent,
  ],
})
export class AnalyticsModule {}
