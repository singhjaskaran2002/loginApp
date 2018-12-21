import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;

  constructor(private http: HttpClient) { } 

  login(user) {
    return this.http.post<any>('http://192.168.1.66:8081/user/login', user);
  }
}
