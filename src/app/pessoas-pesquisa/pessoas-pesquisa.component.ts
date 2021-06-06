import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true},
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false},
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true},
    { nome: 'Luiz Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true},
    { nome: 'Sabrina Santos', cidade: 'Porto Alegre', estado: 'RS', ativo: false},
    { nome: 'Ana Morais', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true}
  ];

}
