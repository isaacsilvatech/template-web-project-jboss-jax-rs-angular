import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { PesqLojaLstComponent } from './pesq-loja-lst/pesq-loja-lst.component';
import { PesqLojaComponent } from './pesq-loja.component';

@NgModule({
  declarations: [
    PesqLojaComponent,
    PesqLojaLstComponent
  ],
  exports: [
    PesqLojaComponent
  ],
  imports: [
    SharedModule
  ]
})
export class PesqLojaModule { }
