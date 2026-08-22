import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'shortUrl',
})
export class ShortUrlPipe implements PipeTransform {
  private baseUrl = environment.shortUrl;

  transform(shortCode?: string): string {
    if (!shortCode) return '';

    return `${this.baseUrl}${shortCode}`;
  }
}
