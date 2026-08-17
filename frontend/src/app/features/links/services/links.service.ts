import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Link } from 'src/app/core/models/link.interface';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  private apiUrl = `${environment.apiUrl}/urls`;

  constructor(private http: HttpClient) { }

  getUserLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(this.apiUrl);
  }

  getLink(id: number): Observable<Link> {
    return this.http.get<Link>(`${this.apiUrl}/${id}`);
  }

  createLink(originalUrl: string): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, { original_url: originalUrl });
  }

  updateLink(id: number, data: Partial<Link>): Observable<Link> {
    return this.http.put<Link>(`${this.apiUrl}/${id}`, data);
  }

  deleteLink(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
