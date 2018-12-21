import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  query() {
    return this.http.get<any>('http://192.168.1.66:8081/user/list');
  }

  protectedRoute() {
    var auth_Token = 'Bearer ' + localStorage.getItem('accessToken');
    return this.http.get<any>('http://192.168.1.66:8081/protected/route', { headers: new HttpHeaders().set('Authorization', auth_Token) });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedEmail');
    this.router.navigateByUrl('/');
    this.toastr.success('You are successfully logged out');
  }

}
