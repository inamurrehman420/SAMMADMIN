import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";
import { finalize } from "rxjs";
import { __assign } from "tslib";
import { NgxSpinnerService } from "ngx-spinner";
import { DomainUtills } from "app/utilities/domain/domain-utils";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialog,
    private toastr: ToastrService,
    private authService:AuthService,
    private spinner: NgxSpinnerService,
  ) {}
  
  private domainUtills = new DomainUtills();

  ngOnInit(): void {
    this.signInF()
  }

  signInF() {
    this.signUpForm = this._formBuilder.group({
      email: ["", [Validators.required]],
      user_password: ["", [Validators.required]],
      confirm_password: ["", [Validators.required]],
      full_name: ["", [Validators.required]],
      role_id: [3, [Validators.required]],
    });
  }

  onSubmit() {
    this.spinner.show();
    this.authService.Register(this.signUpForm.value)
    .pipe(
        finalize(() => {
           this.spinner.hide();
        })
    )
    .subscribe((res) => {
        if (res.success === true) {
          // localStorage.setItem("UserInfo",JSON.stringify(res.data))
          this.toastr.success('Login Successfully','Success');
          this.router.navigateByUrl('/sign-in');
   
        } else { 
          this.toastr.error(res.message,'Failed');
           
        }
    });
  }   

  onGoogleSigninSuccess(){
    window.location.href = this.domainUtills.GetDomain() + 'auth/google'
  }

}
