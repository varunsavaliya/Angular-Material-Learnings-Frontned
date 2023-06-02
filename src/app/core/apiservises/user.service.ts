import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'api/Users');
  }

  addUser(addUserRequest: User): Observable<any> {
    const user = this.http.post<any>(this.baseApiUrl + 'api/Users', addUserRequest);
    return user;
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(this.baseApiUrl + 'api/Users/' + id);
  }

  updateUser(id: string, updateUserRequest: User): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + 'api/Users/' + id, updateUserRequest);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.baseApiUrl + 'api/Users/' + id);
  }
}
