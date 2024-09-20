import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/core/services/util.service';
import { DialogRef } from '../../dialog/models/dialog-ref.model';
import { PesqLojaService } from '../pesq-loja.service';

@Component({
  selector: 'cmp-pesq-loja-lst',
  templateUrl: './pesq-loja-lst.component.html',
  styleUrls: ['./pesq-loja-lst.component.css']
})
export class PesqLojaLstComponent implements OnInit {

  protected lista: Array<any[]> = [];
  protected loading: boolean;
  protected selectedItem: any[];

  protected form = new FormGroup({
    apelido: new FormControl<string>(null),
    paginator: new FormControl<number>(100)
  })

  constructor(private service: PesqLojaService, public ref: DialogRef<PesqLojaLstComponent>, private util: UtilService) {
  }

  public ngOnInit(): void {
  }

  public pesquisar() {
    this.loading = true;
    this.service.getList(this.form.getRawValue()).subscribe(lista => {
      this.lista = lista
      this.loading = false;
    });
  }

  protected selecionar() {
    if (this.selectedItem) {
      this.ref.close(this.selectedItem[0]);
    } else {
      this.util.showMensagem("Selecione um item!")
    }
  }
}
