import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamManagmentComponent } from './teamManagment/teamManagment.component';
const routes: Routes = [
  {
    path:'',component:TeamManagmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamManagmentRoutingModule { }
