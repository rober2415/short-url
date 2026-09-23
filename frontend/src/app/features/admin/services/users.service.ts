import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((users) => this.usersSubject.next(users))
    );
  }

  createUser(user: CreateUserRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, user).pipe(
      tap((created) =>
        this.usersSubject.next([...this.usersSubject.value, created.user]),
      ),
    );
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      tap((updated) => {
        const currentUsers = this.usersSubject.getValue();
        const updatedList = currentUsers.map((u) => (u.id === id ? updated : u));
        this.usersSubject.next(updatedList);
      })
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.getValue();
        this.usersSubject.next(currentUsers.filter((u) => u.id !== id));
      })
    );
  }
}
