import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaLogadaDirective } from './pessoa-logada.directive';
import { LojaPessoaLogadaDirective } from './loja-pessoa-logada.directive';



@NgModule({
  exports: [
    PessoaLogadaDirective,
    LojaPessoaLogadaDirective
  ],
  declarations: [
    PessoaLogadaDirective,
    LojaPessoaLogadaDirective
  ],
  imports: [
    CommonModule
  ]
})
export class PessoaLogadaModule { }
