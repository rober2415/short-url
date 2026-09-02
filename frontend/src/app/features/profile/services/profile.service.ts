import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/user`;
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateUserProfile(data: Profile): Observable<Profile> {
    return this.http.put<Profile>(this.apiUrl, data);
  }

  deleteUserProfile(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }
}
