import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(user) {
    return this.http.post<any>('http://192.168.1.66:8081/user/register', user);
  }
}
