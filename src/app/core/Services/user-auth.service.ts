import { Injectable } from '@angular/core';
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData && storedUserData != 'undefined') {
      this.userData = JSON.parse(storedUserData);
    }
  }
  private userData: User | null = {
    userId: 0,
    username: '',
    dob: new Date(),
    address: '',
    password: '',
  };

  setUser(data: User) {
    const userData = data;
    localStorage.setItem('user', JSON.stringify(data));
  }

  getUser() {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData && storedUserData != 'undefined') {
      this.userData = JSON.parse(storedUserData || 'null');
    }

    return this.userData;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
