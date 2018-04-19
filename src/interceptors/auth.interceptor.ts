import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public starage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.starage.getUserLocal();

        if (localUser && req.url.startsWith(API_CONFIG.baseUrl)) {
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Brarer ' + localUser.token) })
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}