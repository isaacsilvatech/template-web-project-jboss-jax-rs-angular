import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { UtilService } from 'src/app/core/services/util.service';
import { proximoCampo } from '../../directives/proximo-campo/proximo-campo.directive';
import { DialogService } from '../dialog/services/dialog.service';
import { PesqLojaLstComponent } from './pesq-loja-lst/pesq-loja-lst.component';
import { PesqLojaVo } from './pesq-loja.model';
import { PesqLojaService } from './pesq-loja.service';

@Component({
  selector: 'cmp-pesq-loja',
  templateUrl: './pesq-loja.component.html',
  styleUrls: ['./pesq-loja.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PesqLojaComponent)
  }],
})
export class PesqLojaComponent implements ControlValueAccessor {

  @ViewChild("input") private input: InputNumber;

  @Output() public preenchido = new EventEmitter<any>();

  @Input() public inputId: string;
  @Input() public disabled: boolean = false;
  @Input() public proximoCampo: string;

  private viaSet: boolean = false;
  protected loading: boolean = false;

  private _entity: PesqLojaVo;

  protected form = new FormGroup({
    codigo: new FormControl<number>(null),
    nome: new FormControl<string>(null),
  })

  public onChange = (codigo: number) => { };

  constructor(private service: PesqLojaService, private util: UtilService, private dialogService: DialogService) {
  }

  protected getEntity(codigo: number) {

    this.form.controls.codigo.patchValue(codigo);

    if (this.form.getRawValue().codigo) {
      this.loading = true;
      this.service.getEntity(this.form.getRawValue().codigo).subscribe(entity => {

        this.loading = false;

        if (!entity) {
          this.util.showMensagem('Código inexistente!').onClose.subscribe(() => {
            this.limpar();
            this.focus();
          });
          return;
        }

        this._entity = entity;
        this.form.controls.nome.patchValue(entity.apelido);

        this.onChange(entity.codLoja)
        this.preenchido.emit();
        if (!this.viaSet) {
          proximoCampo(this.proximoCampo);
        }
      })
    }
  }

  public get entity(): PesqLojaVo {
    return this._entity;
  }

  public get value() {
    return this.form.getRawValue();
  }

  protected show() {
    let ref = this.dialogService.open(PesqLojaLstComponent, {
      title: 'Pesq. Loja',
      width: '500px',
      height: '400px',
      closeButton: true,
      esc: true
    });

    ref.onClose.subscribe(codigo => {
      this.focus();
      this.viaSet = false;
      if (codigo) {
        this.getEntity(codigo);
      }
    });
  }

  protected keydown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      const codigo = this.form.getRawValue().codigo;
      if (codigo) {
        this.viaSet = false;
        this.getEntity(codigo);
      } else {
        proximoCampo(this.proximoCampo);
      }
    } else if (event.key == '*') {
      this.show();
    }
  }

  protected limpar() {
    this._entity = null;
    this.form.controls.nome.patchValue(null);
    this.loading = false;
    this.onChange(null);
  }

  public limparTudo() {
    this.form.controls.codigo.patchValue(null);
    this.limpar();
  }

  public focus() {
    setTimeout(() => {
      this.input?.input?.nativeElement?.focus();
    })
  }

  public writeValue(codigo: any): void {
    if (codigo) {
      this.viaSet = true;
      this.getEntity(codigo);
    } else {
      this.limparTudo();
    }
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void { }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
