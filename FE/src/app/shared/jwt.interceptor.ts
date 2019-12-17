import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userService.userToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.userToken}`
        }
      });
    }

    return next.handle(request);
  }
}
