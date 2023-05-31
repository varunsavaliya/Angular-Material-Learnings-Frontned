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

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + 'api/Users');
  }

  addUser(addUserRequest: User): Observable<User> {
    const user = this.http.post<User>(this.baseApiUrl + 'api/Users', addUserRequest);
    return user;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + 'api/Users/' + id);
  }

  updateUser(id: string, updateUserRequest: User): Observable<User> {
    return this.http.put<User>(this.baseApiUrl + 'api/Users/' + id, updateUserRequest);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.baseApiUrl + 'api/Users/' + id);
  }
}
