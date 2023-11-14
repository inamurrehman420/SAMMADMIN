import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CallbackComponent } from './modules/auth/callback/callback.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/dashboard" },

  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: "signed-in-redirect", pathMatch: "full", redirectTo: "/dashboard" },
  {
    path:"auth/callback",
    component:CallbackComponent
  },
  {
    path: "",
    component: LoginComponent,
    children: [
      {
        path: "sign-in",
        loadChildren: () =>
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "",
    component: ForgotPasswordComponent,
    children: [
      {
        path: "forgot-password",
        loadChildren: () =>
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "",
    component: RegisterComponent,
    children: [
      {
        path: "register",
        loadChildren: () =>
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "",
    component: ResetPasswordComponent,
    children: [
      {
        path: "reset-password",
        loadChildren: () =>
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },

  {
    path: "layout",
    loadChildren: () =>
      import("./layouts/admin-layout/admin-layout.module").then(
        (m) => m.AdminLayoutModule
      ),
  },

  {
    path: "",
    component: AdminLayoutComponent,

    children: [
      {
        path: "dashboard",
        component:DashboardComponent
        // loadChildren: () =>
        //   import("./").then(
        //     (m) => m.DashboardModule
        //   ),
      },
      {
        path: "teamManagment",
        loadChildren: () =>
          import("./modules/teamManagment/teamManagment.module").then(
            (m) => m.TeamManagmentModule
          ),
      },
     { path: "**", redirectTo: "404-not-found" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
