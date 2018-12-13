import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {};
  public form: FormGroup;
  EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.EMAIL_REGEX)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      name: ['', Validators.required],
      city: ['', Validators.required]
    })

    this.user = { email: '', password: '', name: '', city: '' }
  }

  ngOnInit() {
  }

  showEmailTaken() {
    this.toastr.warning('Email already taken');
  }

  showSucess() {
    this.toastr.success('Registered Successfully', '');
  }

  showError() {
    this.toastr.error('Server down, please try again later', '');
  }

  registerUser() {
    if (this.form.valid) {
      this.registerService.register(this.user).subscribe(res => {
        if (res.status === 'taken') {
          this.showEmailTaken();
        } else if (res.status === 'true') {
          this.showSucess();
          this.router.navigateByUrl('/');
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

  cancelRegister() {
    this.user = {};
    this.router.navigateByUrl('/');
  }

}
