import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLstComponent } from './grid-lst.component';
import { GridPesqLstComponent } from './grid-pesq-lst/grid-pesq-lst.component';
import { GridActionLstComponent } from './grid-action-lst/grid-action-lst.component';
import { GridTableLstComponent } from './grid-table-lst/grid-table-lst.component';
import { GridFooterLstComponent } from './grid-footer-lst/grid-footer-lst.component';



@NgModule({
  exports:[
    GridLstComponent,
    GridPesqLstComponent,
    GridActionLstComponent,
    GridTableLstComponent,
    GridFooterLstComponent
  ],
  declarations: [
    GridLstComponent,
    GridPesqLstComponent,
    GridActionLstComponent,
    GridTableLstComponent,
    GridFooterLstComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GridLstModule { }
