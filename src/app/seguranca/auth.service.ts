import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oathTokenUrl = 'http://localhost:8082/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFyMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oathTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        this.armazenarToken(JSON.parse(JSON.stringify(response)).access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          const responseJson = JSON.parse(JSON.stringify(response)).error;
          if (responseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string) {
    const helper = new JwtHelperService();
    this.jwtPayload = helper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
