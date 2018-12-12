import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import { FrontPageComponent } from './front-page/front-page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: FrontPageComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    FrontPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, RegisterService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
