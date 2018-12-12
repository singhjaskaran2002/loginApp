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

  isRegisterError = false;
  emailTaken = false;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
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

  removeMsg(event) {
    this.emailTaken = false;
  }

  registerUser() {
    if (this.form.valid) {
      this.registerService.register(this.user).subscribe(res => {
        if (res.status === 'taken') {
          this.emailTaken = true;
        } else if (res.status === 'true') {
          this.isRegisterError = false;
          this.router.navigateByUrl('/');
        } else if (res.status === 'false') {
          this.isRegisterError = true;
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
