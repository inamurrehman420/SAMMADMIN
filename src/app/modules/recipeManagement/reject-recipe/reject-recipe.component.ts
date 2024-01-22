import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "app/modules/shared/loader/loader.service";
import { finalize } from "rxjs";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-reject-recipe",
  templateUrl: "./reject-recipe.component.html",
  styleUrls: ["./reject-recipe.component.scss"],
})
export class RejectRecipeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RejectRecipeComponent>,
    private recipeService:RecipeService,
    private toastr: ToastrService,
    public loaderService: LoaderService
  ) {}
  usersForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.userForm();
    if(this.data){
      this.usersForm.patchValue(this.data);
    }
  }
  userForm() {
    this.usersForm = this._formBuilder.group({
      recipe_id: [],
      recipe_remarks: ["", [Validators.required]],
      recipe_status: ["Rejected", [Validators.required]],
    });
  }
  onSubmit() {
    this.loaderService.isLoading = true;
    this.recipeService
      .ChangeRecipeStatus(this.usersForm.value)
      .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;
        })
      )
      .subscribe((res: any) => {
        if (res.success) {
          this.dialogRef.close(true);
          this.toastr.success(res.message, "Success");
        } else {
          this.toastr.error(res.message, "Error");
        }
      });
  }
  onClose(val) {
    this.dialogRef.close(val);
  }
}
