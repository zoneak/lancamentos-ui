import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { AuthService } from './../seguranca/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    RouterModule
  ],
  providers: [
    AuthService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
