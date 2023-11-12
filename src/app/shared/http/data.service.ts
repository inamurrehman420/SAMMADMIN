import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { HttpResponseHandler } from './http-response-handler.service';
import { DomainUtills } from '../../utilities/domain/domain-utils';
import { REQUESTTYPE } from '../../models/enum/request-type.enum';

@Injectable()
export class DataService {
  private myDomain: string;
  private domainUtills = new DomainUtills();
  constructor(
    protected httpClient: HttpClient,
    protected responseHandler: HttpResponseHandler
  ) {
    this.myDomain = this.domainUtills.GetDomain();
  }


  public genericServiceCaller<T>(callType: REQUESTTYPE, controlerActionName: string, data: any = '') {
    let apiUrl = this.myDomain + controlerActionName;
    
    if (callType && controlerActionName) {
      if (callType == REQUESTTYPE.POST) {

        return this.httpClient
          .post<T>(apiUrl, data)
          .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
      }
      else if (callType == REQUESTTYPE.GET) {
        return this.httpClient
          .get<T>(apiUrl)
          .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
      } else {
        throw 'Invalid Type or Controller Name';
      }
    } else {
       throw 'Invalid Type or Controller Name';
    }
  }

}
