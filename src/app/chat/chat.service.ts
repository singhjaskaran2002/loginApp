import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  loggedEmail: string;
  private socket = io.connect('http://192.168.1.66:8081');

  constructor() {
    this.loggedEmail = localStorage.getItem('loggedEmail');
  }

  send(data) {
    this.socket.emit('message_sent', data);
    data = {};
  }

  newMessage() {
    let observable = new Observable<{ sender: string, receiver: string, message: string }>(observer => {
      this.socket.on('message_received' + this.loggedEmail, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

}
