import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { FocusInitModule } from '../../directives/focus-init/focus-init.module';



@NgModule({
  exports: [
    ContainerComponent
  ],
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    FocusInitModule
  ]
})
export class ContainerModule { }
