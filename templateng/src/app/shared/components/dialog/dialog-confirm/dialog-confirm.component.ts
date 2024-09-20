import { Component } from '@angular/core';
import { DialogRef } from '../models/dialog-ref.model';

@Component({
  selector: 'cmp-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {

  mensagem: string;

  constructor(protected ref: DialogRef<DialogConfirmComponent>) { }

}
