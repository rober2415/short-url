import { Component } from '@angular/core';
import { ShortenerService } from '../../services/shortener.service';
import { Link } from 'src/app/core/models/link.interface';

@Component({
  selector: 'app-shortener-page',
  templateUrl: './shortener-page.component.html',
  styleUrls: ['./shortener-page.component.scss'],
})
export class ShortenerPageComponent {
  latestGeneratedUrl: Link | null = null;

  constructor(private shortenerService: ShortenerService) {}

  onAddUrl(inputUrl: string): void {
    const payload: Link = {
      original_url: inputUrl,
      short_url: '',
    };

    this.shortenerService.addUrl(payload).subscribe({
      next: (response) => {
        this.latestGeneratedUrl = response;
      },
      error: (err) => console.error('Error al acortar la URL', err),
    });
  }
}
