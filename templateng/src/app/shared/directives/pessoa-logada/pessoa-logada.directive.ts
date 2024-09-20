import { Directive, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PessoaLogadaService } from '../../../core/service/pessoa-logada.service';
import { PermissaoService } from '../../../core/service/permissao.service';

@Directive({
  selector: '[cmpPessoaLogada]'
})
export class PessoaLogadaDirective implements OnChanges, OnDestroy {

  private sub: Subscription;

  @Input() public chave: string;
  @Input('cmpPessoaLogada') public preencher: boolean = true;

  constructor(private pessoaLogada: PessoaLogadaService, private ngControl: NgControl, private permissoa: PermissaoService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["preencher"] && this.preencher) {
      if (this.chave) {
        this.permissoa.isPermitido(this.chave).subscribe(b => {
          if (!b) {
            this.ngControl.control.disable();
            this.sub = this.pessoaLogada.getPessoaLogada().subscribe(pessoa => {
              if (pessoa) {
                this.ngControl.control.patchValue(pessoa.codPessoa)
              }
            })
          }
        });
      } else {
        this.sub = this.pessoaLogada.getPessoaLogada().subscribe(pessoa => {
          if (pessoa) {
            this.ngControl.control.patchValue(pessoa.codPessoa)
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
