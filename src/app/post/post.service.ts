import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  auth_token = 'Bearer '+localStorage.getItem('accessToken');

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  query() {
    return this.http.get<any>('http://localhost:8081/user/list');
  }

  protectedRoute() {
    return this.http.get<any>('http://localhost:8081/route/protected', { headers: new HttpHeaders().set('Authorization', this.auth_token) });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/');
    this.toastr.success('You are successfully logged out');
  }

}
