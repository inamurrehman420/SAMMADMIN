import { NgModule, LOCALE_ID } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RecipeComponent } from "./recipe-list/recipe.component";
import { RecipeModuleRoutingModule } from "./recipe-routing.module";
import { RejectRecipeComponent } from "./reject-recipe/reject-recipe.component";


const lang = "en-US";
@NgModule({
  declarations: [RejectRecipeComponent,
    RecipeComponent
  ],
  imports: [
    RecipeModuleRoutingModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: lang }],
})
export class RecipeModule {}
