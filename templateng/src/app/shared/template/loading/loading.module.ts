import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { ProgressBarModule } from 'primeng/progressbar';



@NgModule({
  exports: [
    LoadingComponent
  ],
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ProgressBarModule
  ]
})
export class LoadingModule { }
