import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
import { LoaderService } from "app/modules/shared/loader/loader.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent {
  selectedTime: any;
  resetPasswordForm: FormGroup;
  token:any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private _authService: AuthService,
    private toaster:ToastrService,
    private route: ActivatedRoute,
     public loaderService: LoaderService
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
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      validators: this.matchValidator('newPassword', 'confirmPassword')
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
