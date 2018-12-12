import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;

  constructor(private http: HttpClient) { } 

  login(user) {
    return this.http.post<any>('http://localhost:8081/login', user);
  }
}
