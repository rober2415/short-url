import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile, UpdatePasswordRequest, UpdateProfileRequest } from '../models/profile.interface';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/user`;

  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<Profile> {
    this.isLoadingSubject.next(true);
    return this.http.get<Profile>(this.apiUrl).pipe(
      tap((profile) => this.profileSubject.next(profile)),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateUserProfile(data: UpdateProfileRequest): Observable<Profile> {
    return this.patchUser(data);
  }

  updateUserProfilePassword(data: UpdatePasswordRequest): Observable<Profile> {
    return this.patchUser(data);
  }

  deleteUserProfile(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }

  private patchUser(data: UpdateProfileRequest | UpdatePasswordRequest): Observable<Profile> {
    return this.http.patch<Profile>(this.apiUrl, data).pipe(
      tap((updatedProfile) => this.profileSubject.next(updatedProfile)),
    );
  }
}
