import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
import { LoaderService } from "app/modules/shared/loader/loader.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent {
  selectedTime: any;
  forGotPasswordForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private _authService: AuthService,
     public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.signInF();
  }

  signInF() {
    this.forGotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.loaderService.isLoading = true;
    this._authService
    .ResetLink(this.forGotPasswordForm.value)
    .pipe(
      finalize(() => {
        this.loaderService.isLoading = false;

      })
    )
    .subscribe((resp) => {
      if (resp.success) {
        this.toaster.success(resp.message, 'Success');
      }
      else {
        this.toaster.error(resp.message, 'Error');
      }
    })
  }
}
