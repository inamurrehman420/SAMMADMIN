import { NgModule, LOCALE_ID } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RecipeComponent } from "./recipe-list/recipe.component";
import { RecipeModuleRoutingModule } from "./recipe-routing.module";


const lang = "en-US";
@NgModule({
  declarations: [
    RecipeComponent
  ],
  imports: [
    RecipeModuleRoutingModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: lang }],
})
export class RecipeModule {}
