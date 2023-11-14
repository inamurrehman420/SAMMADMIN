import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/dashboard" },
  {
    path: "",
    loadChildren: () =>
      import("./modules/auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./layouts/admin-layout/admin-layout.module").then(
        (m) => m.AdminLayoutModule
      ),
  },
  { path: "**", redirectTo: "404-not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
