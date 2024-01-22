import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeComponent } from "./recipe-list/recipe.component";

const routes: Routes = [
  {
    path: "",
    component: RecipeComponent,
  },
  
  // {
  //   path: "add-recipe",
  //   component: AddRecipeComponent,
  // },
  // {
  //   path: "add-recipe/:id",
  //   component: AddRecipeComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeModuleRoutingModule {}
