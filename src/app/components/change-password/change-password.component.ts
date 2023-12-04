import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";
import { LoaderService } from "app/modules/shared/loader/loader.service";
import { AuthService } from "app/modules/auth/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
  selectedTime: any;
  resetPasswordForm: FormGroup;
  token:any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private toaster:ToastrService,
    private route: ActivatedRoute,
     public loaderService: LoaderService,
     private dialogRef: MatDialogRef<ChangePasswordComponent>,
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.route.queryParams
      .subscribe(params => {
        this.token = params;
      }
    )
    
  }

  resetForm() {
    this.resetPasswordForm = this._formBuilder.group({
      old_password: ["", [Validators.required]],
      new_password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]],
      validators: this.matchValidator('new_password', 'confirm_password')
    });
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
          const error = { confirmedValidator: 'Passwords do not match.' };
          matchingControl!.setErrors(error);
          return error;
        } else {
          matchingControl!.setErrors(null);
          return null;
        }
    }}

  onSubmit() {
    this.loaderService.isLoading = true;
    const body = {
      ...this.token,
      ...this.resetPasswordForm.value
    }
    this._authService
    .ResetPassword(body)
    .pipe(
      finalize(() => {
        this.loaderService.isLoading = false;

      })
    )
    .subscribe((resp)=>{
      if(resp.success){
        this.toaster.success(resp.message,'Success');
        this.router.navigate(['/sign-in'])
      }
      else{
          this.toaster.error(resp.message,'Error');
      }
    })
  }
}
