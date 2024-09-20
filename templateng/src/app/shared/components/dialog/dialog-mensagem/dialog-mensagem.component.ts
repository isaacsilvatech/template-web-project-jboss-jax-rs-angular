import { Component, HostListener } from '@angular/core';
import { DialogRef } from '../models/dialog-ref.model';

@Component({
  selector: 'cmp-dialog-mensagem',
  templateUrl: './dialog-mensagem.component.html',
  styleUrls: ['./dialog-mensagem.component.css']
})
export class DialogMensagemComponent {

  mensagem: string;

  constructor(protected ref: DialogRef<DialogMensagemComponent>) { }

  @HostListener("window:keydown.esc")
  onEsc() {
    this.ref.close();
  }
}
