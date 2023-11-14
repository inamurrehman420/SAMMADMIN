import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo:'sign-in',
    pathMatch:'full'
  },
  {
    path:'',
    children:[
      {
        path: "sign-in",
        component: LoginComponent,
      },
      {
        path:'forgot-password',
        component:ForgotPasswordComponent
      },
      {
        path:'reset-password',
        component:ResetPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
