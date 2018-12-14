import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

    sendMessage(mail) {
      return this.http.post<any>('http://localhost:8081/send/email', mail);
    }

}
