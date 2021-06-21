import { Lancamento } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao!: string;
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  pagina: number = 0;
  itensPorPagina: number = 5;
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
    /* Descrição */
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    /* Vencimento Inicio */
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    /* Vencimento Fim */
    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    /* Paginação */
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params }).toPromise().then(response => {
      const responseJson = JSON.parse(JSON.stringify(response));
      const lancamentos = responseJson.content;

      const resultado = {
        lancamentos: lancamentos,
        total: responseJson.totalElements
      }

      return resultado;
    });

  }

  excluir(codigo: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers }).toPromise().then();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .toPromise().then(response => JSON.parse(JSON.stringify(response)));
  }
}
