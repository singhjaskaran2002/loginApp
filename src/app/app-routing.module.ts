import { ChatComponent } from './chat/chat.component';
import { PostComponent } from './post/post.component';
import { ContactComponent } from './contact/contact.component';
import { PasswordComponent } from './password/password.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { AuthGuardService as AuthGuard } from './services/authGuard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: FrontPageComponent },
  { path: 'update/password', component: PasswordComponent },
  { path: 'connect', component: ContactComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'post', component: PostComponent, canActivate: [AuthGuard], canDeactivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
