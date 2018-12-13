import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
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

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: FrontPageComponent },
  { path: 'update/password', component: PasswordComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    FrontPageComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
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
  providers: [LoginService, RegisterService, AuthGuard, PasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
