import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  nome!: string;
  pessoas = [];
  @ViewChild('tabela') grid: any;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ){}

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total,
      this.pessoas = resultado.pessoas
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir o registro?',
      accept: () => {
        this.excluir(pessoa);
      }
    })
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo).then(() => {
      this.grid.first = 0;
      this.pesquisar(0);
      this.messageService.add({severity: 'success', summary: 'Pessoa excluída com sucesso!'});
    });
  }

}
