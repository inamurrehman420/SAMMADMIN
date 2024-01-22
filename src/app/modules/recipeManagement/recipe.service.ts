import { Injectable } from '@angular/core';
import { DataService } from 'app/http/data.service';
import { REQUESTTYPE } from 'app/models/enum/request-type.enum';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {


  constructor(private _dataService: DataService) { }

  GetRecipe(obj:any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'recipe/get-all-recipes-admin', obj)
  }

  ChangeRecipeStatus(obj:any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'recipe/change-recipes-status', obj)
  }

  AddUpdateRecipe(formData: any) {
    debugger
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'recipe/add-update-recipe', formData)
  }

  RemoveRecipe(id: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.GET, `recipe/delete-recipe/${id}`)
  }

  GetIngrediantsByRecipeId(id: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.GET, `recipe/recipe-detail/${id}`)
  }
  UploadPic(recipe_id, file: File) {
    var formData = new FormData();
    formData.append('recipe_id', recipe_id);
    formData.append('file', file);    
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'recipe/upload-recipe', formData)    
}

}
