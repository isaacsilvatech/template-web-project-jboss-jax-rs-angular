import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { PesqLojaVo } from './pesq-loja.model';

@Injectable({
  providedIn: 'root'
})
export class PesqLojaService {


  constructor(private http: HttpClient) { }

  getEntity(codigo: any): Observable<PesqLojaVo> {

    return this.http.get<PesqLojaVo>(API_URL + "/cmp/pesq/loja/" + codigo);
  }

  getList(params: any): Observable<Array<any[]>> {
    return this.http.get<Array<any[]>>(API_URL + "/cmp/pesq/loja?" + new URLSearchParams(params).toString());
  }
}
