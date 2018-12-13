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

  users = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  logoutMessageToastr() {
    this.toastr.success('Logged out successfully');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
    this.logoutMessageToastr();
  }

  getUsers() {
    this.postService.get().subscribe(res => {
      this.users = res.users;
    });
  }
}
