import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public jwtHelper: JwtHelperService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }


  async checkLogin(url: string): Promise<boolean> {
    
    let data: any = this.getQueryParams(url);
    const token = localStorage.getItem('access_token')
    if (token) {
      var validToken = !this.jwtHelper.isTokenExpired(token);
      if (validToken) {
        return true;
      }
    }
    this.router.navigate(['/auth'], { queryParams: { returnUrl: url } });
    return false;
  }

  
  getQueryParams(url: string) {
    let obj: any = {};
    let queryparams: any = url.split("?").pop();
    queryparams.split("&").forEach((x: any) => {
      obj[x.trim().split("=")[0]] = x.trim().split("=")[1]
    })
    return obj;

  }



}
