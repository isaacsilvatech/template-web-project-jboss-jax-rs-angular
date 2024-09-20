import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ACCESS_TOKEN_STORAGE_KEY = "access_token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt = new JwtHelperService();

  constructor() {
    let token: string = this.getToken();
    if (token && !this.jwt.isTokenExpired(token)) {
      this.setToken(token);
    }
  }

  public setToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }


  public getMatricula() {
    return this.jwt.decodeToken(this.getToken())['matricula'];
  }

  public getToken(): string {
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) ?? '';
  }


  public removeToken() {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  public isTokenValido(): boolean {
    let token = this.getToken();
    return token != null && !this.jwt.isTokenExpired(token);
  }

  public isLogado(): boolean {
    return !!this.getToken();
  }
}
