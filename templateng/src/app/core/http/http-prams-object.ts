import { DatePipe } from "@angular/common";
import { HttpParams } from "@angular/common/http";

export class HttpParamsObject extends HttpParams {

    constructor(object: any, dateFormat: string = 'dd/MM/yyyy') {
        let objectParams: any = {};
        const datePipe = new DatePipe("pt-BR");
        for (let key in object) {
            let value = object[key];
            if (value instanceof Date) {
                value = datePipe.transform(value, dateFormat);
            }
            objectParams[key] = value;
        }
        super({ fromObject: objectParams });
    }
}