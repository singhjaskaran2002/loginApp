import { ContactService } from './../contact/contact.service';
import { ToastrService } from 'ngx-toastr';
import { PostService } from './post.service';
import { Router } from '@angular/router';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  matchEmail:any;
  users = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getUsers();
    var token = localStorage.getItem('accessToken');
    if (token) {
      var tokenData = token.split('.');
      var payload = JSON.parse(atob(tokenData[1]));
      this.matchEmail = payload.user[0];
    }
  }

  logoutMessageToastr() {
    this.toastr.success('Logged out successfully');
  }

  checkAuthorization() {
    console.log(localStorage.getItem('accessToken'));
    this.postService.protectedRoute().subscribe(res => {
      this.toastr.success('you are authorized');
    });
  }

  logout() {
    this.postService.logout();
  }

  getUsers() {
    this.postService.query().subscribe(res => {
      this.users = res.users;
    });
  }

  connect(email){
    localStorage.setItem('recepient', email);
    this.router.navigateByUrl('/connect');
  }
}
