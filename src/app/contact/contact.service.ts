import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

    sendMessage(email) {
      return this.http.post<any>('http://192.168.1.66:8081/user/send/email', email);
    }

}
