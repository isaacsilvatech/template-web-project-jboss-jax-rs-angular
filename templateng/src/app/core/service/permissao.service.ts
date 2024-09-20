import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService {

  constructor(private http: HttpClient) { }

  public isPermitido(chave: string): Observable<boolean> {

    return this.http.get<boolean>(API_URL + "/permissao/" + chave);
  }

  public isPermitidoByMatricula(chave: string, matricula: any): Observable<boolean> {

    return this.http.get<boolean>(API_URL + "/permissao/" + chave + "/" + matricula);
  }
}
