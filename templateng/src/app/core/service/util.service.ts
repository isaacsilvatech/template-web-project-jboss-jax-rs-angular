import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import { DialogLoadingComponent } from '../../shared/components/dialog/dialog-loading/dialog-loading.component';
import { DialogMensagemComponent } from '../../shared/components/dialog/dialog-mensagem/dialog-mensagem.component';
import { DialogRef } from '../../shared/components/dialog/models/dialog-ref.model';
import { DialogService } from '../../shared/components/dialog/services/dialog.service';
import { DialogConfirmComponent } from './../../shared/components/dialog/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private dialog: DialogService) {
  }

  public showErro(msg: string): DialogRef<DialogMensagemComponent> {
    let ref = this.dialog.open(DialogMensagemComponent, {
      title: 'Erro!',
      closeButton: true,
      esc: true
    });

    ref.componentInstance.mensagem = msg;

    return ref;
  }

  public showMensagem(msg: string): DialogRef<DialogMensagemComponent> {
    let ref = this.dialog.open(DialogMensagemComponent, {
      title: 'Opa!',
      closeButton: true,
      esc: true
    });

    ref.componentInstance.mensagem = msg;

    return ref;
  }

  public showConfirme(msg: string): DialogRef<DialogConfirmComponent> {
    let ref = this.dialog.open(DialogConfirmComponent, {
      title: 'Opa!',
      width: '300px',
      closeButton: true,
      esc: true
    });

    ref.componentInstance.mensagem = msg;

    return ref;
  }

  public showLoading(msg: string): DialogRef<DialogLoadingComponent> {

    let ref = this.dialog.open(DialogLoadingComponent, {
      title: 'Opa!',
      width: '200px',
      closeButton: true
    });

    ref.componentInstance.mensagem = msg;

    return ref;
  }

  public exportExcel(excelBuffer: any, fileName: string) {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([excelBuffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  exportImage(imagem: Blob, fileName: string) {
    FileSaver.saveAs(imagem, fileName);
  }

  public exportExcelByTable(element: HTMLElement, fileName: string): void {

    const worksheet = xlsx.utils.table_to_sheet(element);
    const workbook = { Sheets: { 'Dados': worksheet }, SheetNames: ['Dados'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.exportExcel(excelBuffer, fileName);
  }

  public focus(id: string): void {
    let lastDialogElement = this.dialog.getLastDialogElement();
    if (lastDialogElement) {
      let elementFocusable = lastDialogElement.querySelector("#" + id) as HTMLElement;
      if (elementFocusable) {
        elementFocusable.focus();
      } else {
        document.getElementById(id).focus();
      }
    } else {
      document.getElementById(id).focus();
    }
  }
}
