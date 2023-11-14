import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthService } from "./auth.service";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  // {
  //   path: "sign-in",
  //   component: LoginComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AuthRoutingModule {}
