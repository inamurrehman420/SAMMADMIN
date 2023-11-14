import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router, 
              public jwtHelper: JwtHelperService,
              private toastr: ToastrService){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['access_token']; // Replace 'yourQueryParam' with your actual query parameter name
      if (token) {
        this.checkToken(token);
      }
      else{
        this.router.navigate(['/sign-in']);
      }
    });
  }
  checkToken(token:string){
    let validToken = !this.jwtHelper.isTokenExpired(token);
    if(validToken){
      const data = this.jwtHelper.decodeToken(token);
      if(data){
        data.accessToken = token;
        localStorage.setItem("UserInfo",JSON.stringify(data))
        this.toastr.success('Login Successfully','Success');
        this.router.navigateByUrl('/dashboard');
        return;
      }
    }
    this.toastr.error('Something went wrong','Failed');
    this.router.navigateByUrl('/sign-in');
  }
}
