import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8082/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic YWRtaW5AYWsuY29tOmFkbWlu');

    return this.http.get(this.categoriasUrl, { headers }).toPromise().then(response => {
      return JSON.parse(JSON.stringify(response));
    })
  }

}
