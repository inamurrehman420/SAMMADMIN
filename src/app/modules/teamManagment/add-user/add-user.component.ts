import { Component, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TeamManagmentService } from "../teamManagment.service";
import { catchError, finalize } from "rxjs";
import { DomainUtills } from "app/utilities/domain/domain-utils";
import { LoaderService } from "app/modules/shared/loader/loader.service";
import { environment } from "environments/environment";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent {
  usersForm: FormGroup;
  private selectedFile: File;
  public avatarURL: any;
  Roles:Role[]=[];
  visible: boolean=false;
  domainutil=new DomainUtills();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private teamManagmentService:TeamManagmentService,
    private toastr: ToastrService,
     public loaderService: LoaderService,
    
  ) {}

  ngOnInit(): void {
    this.GetRolesLOV();
    this.userForm();
    if(this.data){
      
      this.usersForm.patchValue(this.data);
      // console.log(this.domainutil.GetDomain()+this.data.profile_pic_path)
      // console.log("http://localhost:7001"+this.data.profile_pic_path);
      if(this.data.profile_pic_path)
      this.avatarURL = environment.apiUrl+this.data.profile_pic_path;
    }
  }

  userForm() {
    this.usersForm = this._formBuilder.group({
      user_id: [0],
      profile_picture: ["", [Validators.required]],
      full_name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phone_number: ["", [Validators.required]],
      user_password: ["", [Validators.required]],
      role_id: ["", [Validators.required]],
    });
  }

  // onFileSelect(event) {
  //   this.selectedFile = event.target.files[0];
  // }
  removeImg(){
    this.avatarURL = null;
  }

  onFileChange(event) {
    
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        this.selectedFile = event.target.files[0];

        var Name = this.selectedFile.name.split('.').pop();
        if (Name != undefined) {
            if (Name.toLowerCase() == "jpg" || Name.toLowerCase() == "jpeg" || Name.toLowerCase() == "png") {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                    this.avatarURL = event.target.result;
                    this.visible = false;
                }
                reader.readAsDataURL(this.selectedFile);
            } else {
                this.toastr.error("Only jpeg,jpg and png files are allowed");
                return;
            }
        }
    } else {
        this.visible = true;
    }
}

  changeAvatar(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.log("Only images are supported.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.avatarURL = reader.result;
    };
  }

  onSubmit() {
    this.loaderService.isLoading = true;
    this.teamManagmentService.AddUpdateUser(this.usersForm.value)
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;

        })
    )
    .subscribe((res) => {
        if (res.success === true) {
          // this.toastr.success("User Added Successfully", "Success");
          // this.toastr.success('Login Successfully','Success');
        if (this.avatarURL.includes('base64')) {
          this.UploadImage();
        }else{
          this.dialogRef.close(true);
          this.toastr.success("Updated Successfully", "Success");
        }
        } else { 
          this.toastr.error('Something went wrong','Failed');
           
        }
    });    
  }

  UploadImage(){
    this.loaderService.isLoading = true;
    this.teamManagmentService.UploadProfilePic(this.usersForm.get('user_id').value,this.selectedFile)
    .pipe(
        finalize(() => {
          this.loaderService.isLoading = false;

        })
    )
    .subscribe((res) => {
        if (res.success === true) {
          this.dialogRef.close(true);
          this.toastr.success("User Added Successfully", "Success");
        } else { 
          this.toastr.error('Something went wrong','Failed');
           
        }
    });    
  }

  onClose(val) {
    this.dialogRef.close(val);
  }


  GetRolesLOV(){
      this.loaderService.isLoading = true;
      this.teamManagmentService.GetRole({})
      .pipe(
          finalize(() => {
            this.loaderService.isLoading = false;

          })
      )
      .subscribe((res) => {
        
          if (res.success === true) {
            
            this.Roles =res.data;
            // this.toastr.success('Login Successfully','Success');
          } else { 
            this.toastr.error('Something went wrong with LOV','Failed');
             
          }
      });
    
  }
}

export interface Role {
  
  role_id: number;
  role_name: string;
}