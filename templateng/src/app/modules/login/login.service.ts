import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../environments/environment';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public check(login: Login): Observable<Login> {

    return this.http.post<Login>(API_URL + "/login/check", login);
  }

  public alterarSenhaVencida(login: Login): Observable<Login> {
    return this.http.put<Login>(API_URL + "/login/altera-senha-vencida", login);
  }

  public alterarSenha(login: Login): Observable<Login> {
    return this.http.put(API_URL + "/login/altera-senha", login);
  }
}
