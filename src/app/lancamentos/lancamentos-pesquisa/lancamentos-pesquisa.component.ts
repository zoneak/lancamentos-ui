import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
})
export class LancamentosPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new LancamentoFiltro();
    lancamentos = [];
    @ViewChild('tabela') grid: any;

    constructor(
      private lancamentoService: LancamentoService,
      private messageService: MessageService,
      private confirmation: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      public auth: AuthService,
      private title: Title
    ) {}

    ngOnInit(): void {
      this.title.setTitle('Pesquisa de lançamentos');
    }

    pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total,
          this.lancamentos = resultado.lancamentos
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

    aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first! / event.rows!;
      this.pesquisar(pagina);
    }

    confirmarExclusao(lancamento: any) {
      this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir o registro?',
        accept: () => {
          this.excluir(lancamento);
        }
      });
    }

    excluir(lancamento: any) {
      this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.first = 0;
        this.pesquisar(0);
        this.messageService.add({severity:'success', summary:'Lançamento excluído com sucesso!'});
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
}
