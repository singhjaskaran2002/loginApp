import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) { }

  update(password) {
    return this.http.post<any>('http://192.168.1.66:8081/user/update/password', password);
  }
}
