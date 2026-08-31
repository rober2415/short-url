import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Analytic } from '../../models/analytic.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-analytics-table',
  templateUrl: './analytics-table.component.html',
  styleUrls: ['./analytics-table.component.scss'],
})
export class AnalyticsTableComponent implements OnChanges {
  @Input() resultAnalytics: Analytic[] = [];
  @Input() isLoading = false;

  baseUrl = environment.shortUrl;

  itemsPerPage = 10;
  currentPage = 1;
  paginatedAnalytics: Analytic[] = [];
  totalRecords = 0;
  totalPages = 0;

  get hasData(): boolean {
    return this.resultAnalytics.length > 0;
  }

  get startRecord(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalRecords);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resultAnalytics']) {
      this.updatePagination();
    }
  }

  private updatePagination(): void {
    this.totalRecords = this.resultAnalytics.length;
    this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
    this.currentPage = 1;
    this.updateCurrentPage();
  }

  private updateCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAnalytics = this.resultAnalytics.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentPage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentPage();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPage();
    }
  }
}
