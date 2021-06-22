import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ]
})
export class SegurancaModule { }
