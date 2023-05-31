import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl : string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }


  login(loginUser: User):Observable<any>{
    return this.http.post<any>(this.baseApiUrl + 'api/auth/login', loginUser);
    
  }

  signUp(signUpUser: User): Observable<any>{
    return this.http.post<any>(this.baseApiUrl + 'api/auth/signup', signUpUser);
  }
}
