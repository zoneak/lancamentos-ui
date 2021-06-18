import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  pessoasUrl = 'http://localhost:8082/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    /* headers */
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    /* nome */
    let params = new HttpParams();
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    /* paginação */
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    return this.http.get(this.pessoasUrl, { headers, params } ).toPromise().then(response => {
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
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    return this.http.get(this.pessoasUrl, { headers }).toPromise().then(response => {
      const responseJSON = JSON.parse(JSON.stringify(response));
      return responseJSON.content;
    });
  }
}
