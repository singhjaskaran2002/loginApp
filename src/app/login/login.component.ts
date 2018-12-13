import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  public form: FormGroup;
  EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.EMAIL_REGEX)])],
      password: ['', Validators.required]
    });

    this.user = { email: '', password: '' };
  }

  showSucess() {
    this.toastr.success('Welcome', '');
  }

  showError() {
    this.toastr.error('Invalid email and password', '');
  }

  ngOnInit() {
  }

  loginUser() {
    if (this.form.valid) {
      this.loginService.login(this.user).subscribe(res => {
        if (res.status === 'true') {
          this.showSucess();
          localStorage.setItem('loggedEmail', this.user.email);
          localStorage.setItem('accessToken', res.accessToken);
          this.router.navigateByUrl('/post');
        } else if (res.status === 'false') {
          this.showError();
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

}
