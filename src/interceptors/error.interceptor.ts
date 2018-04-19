import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, cought) => {

            let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log(errorObj);

            switch (errorObj.status) {

                case 403:
                    this.handle403();
                    break;

                case 401:
                    this.handle401();
                    break;

                default:
                    this.handleDefault(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    private handle403() {
        this.storage.setUserLocal(null);
    }

    private handle401() {
        let alert = this.alertController.create({
            title: 'Erro 401: Falha de autenticação!',
            message: 'Email ou senha inválidos',
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }

    private handleDefault(objError) {
        let alert = this.alertController.create({
            title: 'Erro ' + objError.status + ':' + objError.error,
            message: objError.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}