import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import { FrontPageComponent } from './front-page/front-page.component';
import { ToastrModule } from "ngx-toastr";
import { PasswordComponent } from './password/password.component';
import { PasswordService } from './password/password.service';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './contact/contact.service';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    FrontPageComponent,
    PasswordComponent,
    ContactComponent,
    ChatComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    BrowserAnimationsModule
  ],
  providers: [LoginService, RegisterService, AuthGuard, PasswordService, ContactService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
