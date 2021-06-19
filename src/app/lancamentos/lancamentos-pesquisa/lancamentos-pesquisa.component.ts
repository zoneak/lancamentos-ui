import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [MessageService]
})
export class LancamentosPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new LancamentoFiltro();
    lancamentos = [];
    @ViewChild('tabela') grid: any;

    constructor(private lancamentoService: LancamentoService, private messageService: MessageService) {}

    ngOnInit(): void {
    }

    pesquisar(pagina = 0) {
      this.filtro.pagina = pagina;
      this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total,
          this.lancamentos = resultado.lancamentos
        });
    }

    aoMudarPagina(event: LazyLoadEvent) {
      const pagina = event.first! / event.rows!;
      this.pesquisar(pagina);
    }

    excluir(lancamento: any) {
      this.lancamentoService.excluir(lancamento.codigo).then(() => {
        this.grid.first = 0;
        this.pesquisar(0);
        this.messageService.add({severity:'success', summary:'Lançamento excluído com sucesso!'});
      });
    }
}
