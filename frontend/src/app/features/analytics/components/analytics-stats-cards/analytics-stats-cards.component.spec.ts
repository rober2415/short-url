import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsStatsCardsComponent } from './analytics-stats-cards.component';

describe('AnalyticsStatsCardsComponent', () => {
  let component: AnalyticsStatsCardsComponent;
  let fixture: ComponentFixture<AnalyticsStatsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsStatsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsStatsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
