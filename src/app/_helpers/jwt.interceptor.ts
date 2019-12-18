import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // agrega header de autorización con  yoken jwt solo si está disponible
        let currentUser = this.authenticationService.currentUserValue;
        console.log("curent user en jwt interceptor", currentUser);
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                    Hola: 'hola otra vez'
                }
            });
        }
        console.log("request en jwt interceptor", request);

        return next.handle(request);
    }
}