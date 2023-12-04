import { LOCALE_ID, NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { GoogleSigninModule } from '../google-signin-module';
import { ToastrModule } from 'ngx-toastr';
import { PasswordToggleDirective } from 'app/directives/password-toggle.directive';
import { ChangePasswordComponent } from 'app/components/change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    CallbackComponent,
    ChangePasswordComponent,
    PasswordToggleDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    GoogleSigninModule,
    SharedModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 15 seconds
      progressBar: true,
  }),
   
  ],
})
export class AuthModule { }
