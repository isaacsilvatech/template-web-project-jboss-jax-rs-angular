import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { PermissaoService } from '../../../core/service/permissao.service';

@Directive({
  selector: '[cmpPermissao]'
})
export class PermissaoDirective implements OnChanges {

  @Input('cmpPermissao') public disabled: boolean = false;
  @Input() public chave: string;

  constructor(private ngControl: NgControl, private permissoa: PermissaoService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.permissoa.isPermitido(this.chave).subscribe(b => {
        if (!b) {
          this.ngControl.control.disable();
        } else {
          const action = this.disabled ? 'disable' : 'enable';
          this.ngControl.control[action]();
        }
      });
    }
  }

}
