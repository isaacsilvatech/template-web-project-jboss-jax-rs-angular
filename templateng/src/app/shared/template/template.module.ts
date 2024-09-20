import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { MainModule } from './main/main.module';



@NgModule({
  exports: [
    TemplateComponent
  ],
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    MainModule
  ]
})
export class TemplateModule { }
