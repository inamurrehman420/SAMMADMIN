import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { HttpResponseHandler } from './http-response-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpResponseInterceptor } from './http-interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
  ]
})
export class HttpModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: HttpModule,
      providers: [
        DataService,
        HttpResponseHandler,
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true }
      ]
    };
  }
 }
