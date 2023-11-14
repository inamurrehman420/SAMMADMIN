import { Injectable } from '@angular/core';
import { REQUESTTYPE } from 'app/models/enum/request-type.enum';
import { DataService } from 'app/shared/http/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  login(formData: any) {
    return ""
  }

  Register(formData: any) {
    return ""
  }

  ChangePassword(formData: any) {
    return ""
  }
  ResetLink(formData: any) {
    return ""
  }
  ResetPassword(formData: any) {
    return ""
  }
  LoginWithGoogle(){
    return ""
  }
}
