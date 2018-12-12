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

  users = {};

  constructor(
    private loginService: LoginService,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getUsers() {
    this.postService.get().subscribe(res => {
      console.log(res);
    });
  }

}
