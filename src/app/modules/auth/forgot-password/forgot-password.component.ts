import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";

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
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.signInF();
  }

  signInF() {
    this.forGotPasswordForm = this._formBuilder.group({
      email: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.show()
    this._authService
    .ResetLink(this.forGotPasswordForm.value)
    .pipe(
      finalize(() => {
        this.spinner.hide();
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
