import { PostService } from './post/post.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private postServiee: PostService
  ) {

  }

  ngOnInit() {
    var token = localStorage.getItem('accessToken');
    if (token) {
      var tokenData = token.split('.');
      var payload = JSON.parse(atob(tokenData[1]));
      if ((new Date().getTime() - payload.timeStamp) > 18000000) {
        this.postServiee.logout();
      }
    }
  }

}
