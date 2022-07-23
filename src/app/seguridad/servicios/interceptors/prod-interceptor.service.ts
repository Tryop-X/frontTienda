import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "../token.service";

@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor{

  constructor(private tokenS: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req;
    const token = this.tokenS

    if(token != null){

      intReq = req.clone({

        headers: req.headers.set('Authorization', 'Bearer ' + token.getToken())
      });
    }
    return next.handle(intReq);
  }
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi:true}]
