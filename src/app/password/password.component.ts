import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from './password.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  password: any = {};

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private toastr: ToastrService,
    private router: Router,
    private postService: PostService
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      currPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    })

    this.password = { current: '', new: '', email: '' }
  }

  ngOnInit() {
    var token = localStorage.getItem('accessToken');
    if (token) {
      var tokenData = token.split('.');
      var payload = JSON.parse(atob(tokenData[1]));
      this.password.email = payload.user[0].email;
    }
  }

  updateUser() {
    if (this.form.valid) {
      this.passwordService.update(this.password).subscribe(res => {
        if (res.status === 'samePass') {
          this.toastr.error('Please use different password from current password');
        } else if (res.status === '401') {
          this.toastr.error('Current password not matched, please try again');
        } else if (res.status === '200') {
          this.toastr.success('Password updated successfully');
          this.router.navigateByUrl('/post');
        } else {
          this.toastr.error('Server down, please try again after some time');
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  cancelUpdate() {
    this.password = {};
    this.router.navigateByUrl('/post');
  }
}
