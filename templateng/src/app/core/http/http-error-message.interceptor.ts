import { Injectable } from '@angular/core';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UtilService } from '../service/util.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorMessageInterceptor implements HttpInterceptor {

    constructor(
        private util: UtilService
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap({
            error: async (erro: HttpErrorResponse) => {
                if (erro.status == 400 && !(erro.error instanceof ProgressEvent)) {
                    let mensagem = erro.error;
                    if (mensagem instanceof ArrayBuffer) {
                        const decoder = new TextDecoder("utf-8");
                        const array = new Uint8Array(mensagem);
                        mensagem = decoder.decode(array);
                    } else if (mensagem instanceof Blob) {
                        mensagem = await mensagem.text();
                    }
                    this.util.showMensagem(mensagem);
                } else if (erro.status != 401) {
                    this.util.showErro(erro.message);
                }
            }
        }));
    }
}