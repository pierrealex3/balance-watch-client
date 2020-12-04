import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from '../keycloak.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private kcService: KeycloakService, private tokenExtractor:HttpXsrfTokenExtractor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.kcService.getToken() || "";
    const token = this.tokenExtractor.getToken() as string;
    req = req.clone({
      setHeaders: {
        "Authorization": "Bearer " + authToken
      }
    });
    return next.handle(req);
  }
}
