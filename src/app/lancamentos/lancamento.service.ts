import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8082/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise();
  }
}
