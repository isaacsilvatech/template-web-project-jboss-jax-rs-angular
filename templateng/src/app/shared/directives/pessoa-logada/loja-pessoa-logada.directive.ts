import { Directive, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PermissaoService } from '../../../core/service/permissao.service';
import { PessoaLogadaService } from '../../../core/service/pessoa-logada.service';

@Directive({
  selector: '[cmpLojaPessoaLogada]'
})
export class LojaPessoaLogadaDirective implements OnChanges, OnDestroy {

  private sub: Subscription;

  @Input() public chave: string;
  @Input('cmpLojaPessoaLogada') public preencher: boolean = true;

  constructor(private pessoaLogada: PessoaLogadaService, private ngControl: NgControl, private permissoa: PermissaoService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["preencher"] && this.preencher) {
      if (this.chave) {
        this.permissoa.isPermitido(this.chave).subscribe(b => {
          if (!b) {
            this.ngControl.control.disable();
            this.sub = this.pessoaLogada.getPessoaLogada().subscribe(pessoa => {
              if (pessoa) {
                this.ngControl.control.patchValue(pessoa.codLojaTrabalha)
              }
            })
          }
        });
      } else {
        this.sub = this.pessoaLogada.getPessoaLogada().subscribe(pessoa => {
          if (pessoa) {
            this.ngControl.control.patchValue(pessoa.codLojaTrabalha)
          }
        })
      }
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
