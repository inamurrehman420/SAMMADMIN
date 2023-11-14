import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleSigninComponent } from './google-signin.component';

@NgModule({
  declarations: [ GoogleSigninComponent ],
  imports: [ HttpClientModule ],
  exports : [ GoogleSigninComponent ]
})
export class GoogleSigninModule { }
