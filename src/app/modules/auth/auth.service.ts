import { Injectable } from '@angular/core';
import { DataService } from 'app/http/data.service';
import { REQUESTTYPE } from 'app/models/enum/request-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _dataService: DataService) { }


  login(formData: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/authenticate', formData)
  }

  Register(formData: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/register-user', formData)
  }

  ChangePassword(formData: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/authenticate', formData)
  }
  ResetLink(formData: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/reset-link', formData)
  }
  ResetPassword(formData: any) {
    return this._dataService.genericServiceCaller(REQUESTTYPE.POST, 'auth/reset-password', formData)
  }
  LoginWithGoogle(){
    return this._dataService.genericServiceCaller(REQUESTTYPE.GET, 'auth/google')
  }
}
