import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CreateRoleRequest, Role, UpdateRoleRequest } from '../models/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.apiUrl}/roles`;

  private rolesSubject = new BehaviorSubject<Role[]>([]);
  roles$ = this.rolesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      tap((roles) => this.rolesSubject.next(roles))
    );
  }

  createRole(role: CreateRoleRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, role).pipe(
      tap((created) =>
        this.rolesSubject.next([...this.rolesSubject.value, created.role])
      )
    );
  }

  updateRole(id: number, role: UpdateRoleRequest): Observable<any> {
    return this.http.put<Role>(`${this.apiUrl}/${id}`, role).pipe(
      tap((updated) => {
        const currentRoles = this.rolesSubject.getValue();
        const updatedList = currentRoles.map((r) => (r.id === id ? updated : r));
        this.rolesSubject.next(updatedList);
      })
    );
  }

  deleteRole(id: number): Observable<Role> {
    return this.http.delete<Role>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentRoles = this.rolesSubject.getValue();
        this.rolesSubject.next(currentRoles.filter((r) => r.id !== id));
      })
    );
  }
}
