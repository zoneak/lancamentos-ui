import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Lancamento } from './../../core/model';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({severity:'success', summary:'Lançamento adicionado com sucesso!'});
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
