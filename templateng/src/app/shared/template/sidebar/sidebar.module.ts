import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  exports:[
    SidebarComponent
  ],
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule
  ]
})
export class SidebarModule { }
