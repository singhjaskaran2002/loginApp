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
    this.password.email = localStorage.getItem('loggedEmail');
  }

  notMatchToastr() {
    this.toastr.error('Current password not matched, please try again');
  }

  notUpdatedToastr() {
    this.toastr.error('Server down, please try again after some time');
  }

  updatedToastr() {
    this.toastr.success('Password updated successfully');
  }

  updateUser() {
    if (this.form.valid) {
      this.passwordService.update(this.password).subscribe(res => {
        if (res.status === 'notMatch') {
          this.notMatchToastr();
        } else if (res.status === 'true') {
          this.updatedToastr();
          this.router.navigateByUrl('/post');
        } else if (res.status === 'false') {
          this.notUpdatedToastr();
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
