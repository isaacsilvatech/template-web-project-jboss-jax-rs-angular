import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../shared/template/loading/loading.service';

@Injectable({
    providedIn: 'root'
})
export class HttpLoadingInterceptor implements HttpInterceptor {

    constructor(
        private loading: LoadingService
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.loading.loading(true);

        return next.handle(request).pipe(tap({
            error: () => {
                this.loading.loading(false);
            },
            finalize: () => {
                this.loading.loading(false);
            },
        }));
    }
}