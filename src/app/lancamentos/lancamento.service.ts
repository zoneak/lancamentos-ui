import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8082/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    let params = new HttpParams();
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise();
  }
}
