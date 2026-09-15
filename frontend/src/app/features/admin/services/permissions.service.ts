import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/permission.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private apiUrl = `${environment.apiUrl}/permissions`;

  private permissionsSubject = new BehaviorSubject<Permission[]>([]);
  permissions$ = this.permissionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPermissions(): Observable<Permission[]>{
    return this.http.get<Permission[]>(this.apiUrl).pipe(
      tap((permissions) => this.permissionsSubject.next(permissions))
    );
  }
}
