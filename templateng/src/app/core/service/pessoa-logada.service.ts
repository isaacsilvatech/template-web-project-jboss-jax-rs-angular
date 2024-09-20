import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP_PRIORITY, HTTP_PRIORITY_NO_DESTROY } from '../http/http-destroyer.interceptor';
import { Pessoa } from '../model/pessoa.model';
import { AuthService } from './auth.service';
import { API_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaLogadaService {

  private pessoaLogadoSubject = new BehaviorSubject<Pessoa>(null);

  constructor(private auth: AuthService, private http: HttpClient) {
    this.reloadPessoaLogada();
  }

  public reloadPessoaLogada() {
    if (this.auth.isTokenValido()) {
      const matricula = this.auth.getMatricula();
      if (matricula) {
        this.setPessoaLogada(matricula);
      }
    }
  }

  public setPessoaLogada(matricula: number) {
    this.getEntityByMatricula(matricula).subscribe(pessoa => {
      this.pessoaLogadoSubject.next(pessoa);
    })
  }

  private getEntityByMatricula(codPessoa: number) {
    let params = new HttpParams().append(HTTP_PRIORITY, HTTP_PRIORITY_NO_DESTROY);
    return this.http.get<Pessoa>(`${API_URL}/pessoa/matricula/${codPessoa}`, { params });
  }

  public removePessoaLogada(): void {
    this.pessoaLogadoSubject.next(null);
  }

  public getPessoaLogada(): Observable<Pessoa> {
    return this.pessoaLogadoSubject.asObservable();
  }
}
