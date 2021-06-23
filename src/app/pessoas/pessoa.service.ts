import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome!: string;
  pagina: number = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    /* nome */
    let params = new HttpParams();
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    /* paginação */
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    return this.http.get(this.pessoasUrl, { params } ).toPromise().then(response => {
      const responseJson = JSON.parse(JSON.stringify(response));
      const pessoas = responseJson.content;

      const resultado = {
        pessoas: pessoas,
        total: responseJson.totalElements
      }

      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl).toPromise().then(response => {
      const responseJSON = JSON.parse(JSON.stringify(response));
      return responseJSON.content;
    });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise().then();
  }

  alterarStatusAtivo(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }).toPromise().then();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, pessoa, { headers })
      .toPromise().then(response => JSON.parse(JSON.stringify(response)));
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa) , { headers })
      .toPromise().then(response => JSON.parse(JSON.stringify(response)));
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise().then(response => JSON.parse(JSON.stringify(response)));
  }
}
