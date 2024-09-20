import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissaoDirective } from './permissao.directive';



@NgModule({
  exports: [
    PermissaoDirective
  ],
  declarations: [
    PermissaoDirective
  ],
  imports: [
    CommonModule
  ]
})
export class PermissaoModule { }
