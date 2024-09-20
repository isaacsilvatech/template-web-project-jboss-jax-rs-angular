import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridFrmComponent } from './grid-frm.component';
import { GridHeaderFrmComponent } from './grid-header-frm/grid-header-frm.component';
import { GridContentFrmComponent } from './grid-content-frm/grid-content-frm.component';
import { GridActionFrmComponent } from './grid-action-frm/grid-action-frm.component';



@NgModule({
  exports: [
    GridFrmComponent,
    GridHeaderFrmComponent,
    GridContentFrmComponent,
    GridActionFrmComponent
  ],
  declarations: [
    GridFrmComponent,
    GridHeaderFrmComponent,
    GridContentFrmComponent,
    GridActionFrmComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GridFrmModule { }
