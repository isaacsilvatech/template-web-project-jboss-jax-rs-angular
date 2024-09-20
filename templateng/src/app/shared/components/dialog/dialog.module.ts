import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { DialogMensagemComponent } from './dialog-mensagem/dialog-mensagem.component';
import { DialogComponent } from './dialog.component';
import { FocusInitModule } from '../../directives/focus-init/focus-init.module';
import { DialogLoadingComponent } from './dialog-loading/dialog-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    DialogComponent,
    DialogMensagemComponent,
    DialogConfirmComponent,
    DialogLoadingComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    FocusInitModule,
    ProgressSpinnerModule
  ]
})
export class DialogModule { }
