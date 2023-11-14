import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

  constructor(private router: Router, public jwtHelper: JwtHelperService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkAccess(state.url);
  }

  async checkAccess(url: string): Promise<boolean> {
    
    const token = localStorage.getItem('access_token')
    if (token) {
      let tokenInfo = this.jwtHelper.decodeToken(token);
      if (tokenInfo.isAdmin) {
        return true;
      }
    }
    this.router.navigate(['/auth'], { queryParams: { returnUrl: url } });
    return false;
  }

  
}
