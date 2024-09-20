import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';



@NgModule({
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MainModule { }
