import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Link } from 'src/app/core/models/link.interface';
import { ShortUrlPipe } from 'src/app/shared/pipes/short-url.pipe';

@Component({
  selector: 'app-links-table',
  templateUrl: './links-table.component.html',
  styleUrls: ['./links-table.component.scss'],
})
export class LinksTableComponent implements OnChanges {
  @Input() links: Link[] = [];
  @Input() isDeleting = false;
  @Input() isLoading = false;
  @Output() deletedRequested = new EventEmitter<number>();

  itemsPerPage = 10;
  currentPage = 1;
  paginatedLinks: Link[] = [];
  totalRecords = 0;
  totalPages = 0;

  constructor(private shortUrlPipe: ShortUrlPipe) {}

  get hasData(): boolean {
    return this.links.length > 0;
  }

  get startRecord(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endRecord(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalRecords);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['links']) {
      this.updatePagination();
    }
  }

  private updatePagination(): void {
    this.totalRecords = this.links.length;
    this.totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
    this.currentPage = 1;

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.updateCurrentPage();
  }

  private updateCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLinks = this.links.slice(startIndex, endIndex);
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

  copyToClipboard(url: string): void {
    const fullUrl = this.shortUrlPipe.transform(url);
    navigator.clipboard.writeText(fullUrl).then(() => {});
  }

  onDelete(id?: number): void {
    if (id) {
      this.deletedRequested.emit(id);
    }
  }
}
