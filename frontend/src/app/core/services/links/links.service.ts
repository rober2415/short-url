import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Link } from 'src/app/core/models/link.interface';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private apiUrl = `${environment.apiUrl}/urls`;

  private linksSubject = new BehaviorSubject<Link[]>([]);
  links$ = this.linksSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private isDeletingIdSubject = new BehaviorSubject<number | null>(null);
  isDeleting$ = this.isDeletingIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserLinks(): Observable<Link[]> {
    this.isLoadingSubject.next(true);
    return this.http.get<Link[]>(this.apiUrl).pipe(
      tap((links) => this.linksSubject.next(links)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createLink(originalUrl: string): Observable<Link> {
    return this.http.post<Link>(this.apiUrl, { original_url: originalUrl }).pipe(
      tap((created) => 
        this.linksSubject.next([...this.linksSubject.value, created]))
    );
  }

  updateLink(id: number, data: Partial<Link>): Observable<Link> {
    return this.http.put<Link>(`${this.apiUrl}/${id}`, data).pipe(
      tap((updated) => {
        const currentLinks = this.linksSubject.getValue();
        const updatedList = currentLinks.map((l) => (l.id === id ? updated : l));
        this.linksSubject.next(updatedList);
      })
    );
  }

  deleteLink(id: number): Observable<any> {
    this.isDeletingIdSubject.next(id);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentLinks = this.linksSubject.getValue();
        this.linksSubject.next(currentLinks.filter((l) => l.id !== id));
      }),
      catchError((error) => {
        return throwError(() => error)
      }),
      finalize(() => this.isDeletingIdSubject.next(null))
    );
  }
}
