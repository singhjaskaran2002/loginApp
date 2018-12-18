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

  registerUser() {
    if (this.form.valid) {
      this.registerService.register(this.user).subscribe(res => {
        console.log('database res: ', JSON.stringify(res));
        if (res.status === 'true') {
          this.toastr.success('Registered Succesfully');
          this.router.navigateByUrl('/');
        } else if (res.status === 'taken') {
          this.toastr.warning('Email already taken');
        } else {
          this.toastr.error('Server down, please try again later');
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
