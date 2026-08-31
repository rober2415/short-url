import { Component, Input } from '@angular/core';
import { Link } from 'src/app/core/models/link.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-url-result',
  templateUrl: './url-result.component.html',
  styleUrls: ['./url-result.component.scss'],
})
export class UrlResultComponent {
  @Input() resultUrl: Link | null = null;
  
  baseUrl = environment.shortUrl;

  get shortUrl(): string {
    return this.resultUrl?.short_url
      ? `${this.baseUrl}${this.resultUrl.short_url}`
      : '';
  }
}
