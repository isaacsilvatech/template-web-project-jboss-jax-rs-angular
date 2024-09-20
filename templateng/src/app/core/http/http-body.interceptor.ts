import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpBodyInterceptor implements HttpInterceptor {

    private readonly DATE_FORMAT = 'dd/MM/yyyy';

    constructor(
        private datePipe: DatePipe
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let object = request.body;
        for (let key in object) {
            if (object[key] instanceof Date) {
                object[key] = this.datePipe.transform(object[key], this.DATE_FORMAT);
            }
        }
        return next.handle(request.clone({ body: object }));
    }
}