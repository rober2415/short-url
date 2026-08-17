import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Link } from 'src/app/core/models/link.interface';

@Injectable({
  providedIn: 'root',
})
export class ShortenerService {
  private apiUrl = `${environment.apiUrl}/urls`;

  constructor(private httpClient: HttpClient) {}

  getUrls(): Observable<Link[]> {
    return this.httpClient.get<Link[]>(this.apiUrl);
  }

  addUrl(shortenedUrl: Link): Observable<Link> {
    return this.httpClient.post<Link>(this.apiUrl, shortenedUrl);
  }
}
