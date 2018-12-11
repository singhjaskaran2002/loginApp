import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {};
  public form: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      city: ['', Validators.required]
    })

    this.user = { email: '', password: '', name: '', city: '' }
  }

  ngOnInit() {
  }

  registerUser() {
    this.registerService.register(this.user).subscribe(res => {
      console.log(res);
    });
  }

}
