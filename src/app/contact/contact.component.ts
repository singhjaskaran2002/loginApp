import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public form: FormGroup;

  mail: any = {};

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    this.mail = { from: '', to: '', subject: '', message: '' }

    this.form = this.formBuilder.group({
      to: ['', Validators.required],
      message: ['', Validators.required],
      subject: ['']
    });
  }

  ngOnInit() {
    var token = localStorage.getItem('accessToken');
    if (token) {
      var tokenData = token.split('.');
      var payload = JSON.parse(atob(tokenData[1]));
      this.mail.from = payload.user[0].email;
      this.mail.to = localStorage.getItem('recepient');
    }
  }

  cancel() {
    this.mail = {};
    this.router.navigateByUrl('/post');
  }

  setFocus() {
    document.getElementById("subject").focus();
  }

  sendMail() {
    this.ngxSpinnerService.show();
    this.contactService.sendMessage(this.mail).subscribe(res => {
      if (res.status === 'true') {
        this.toastr.success('Mail sent successfully');
        this.mail = {};
        localStorage.removeItem('recepient');
        this.router.navigateByUrl('/post');
      } else if (res.status === 'false') {
        this.ngxSpinnerService.hide();
        this.toastr.error('Server down, please try again later');
      }
    });
  }

  connect() {
    if (this.form.valid) {
      if (this.mail.subject === '') {
        if (window.confirm('Sending without subject')) {
          this.sendMail();
        }
        else {
          this.setFocus();
        }
      }
      else {
        this.sendMail();
      }
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsTouched({ onlySelf: true });
      });
    }

  }

}
