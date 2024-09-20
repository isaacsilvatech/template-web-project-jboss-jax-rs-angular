import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../login.model';
import { LoginService } from '../login.service';
import { DialogRef } from '../../../shared/components/dialog/models/dialog-ref.model';
import { UtilService } from '../../../core/service/util.service';

@Component({
  selector: 'cmp-login-altera-senha',
  templateUrl: './login-altera-senha.component.html',
  styleUrls: ['./login-altera-senha.component.css']
})
export class LoginAlteraSenhaComponent {

  protected form = new FormGroup({
    matricula: new FormControl<number>(null),
    senha: new FormControl<string>(null, Validators.required),
    senhaNova: new FormControl<string>(null, Validators.required),
    senhaNovaRepetida: new FormControl<string>(null, Validators.required),
  });

  constructor(private ref: DialogRef<LoginAlteraSenhaComponent>, private loginSerivce: LoginService, private util: UtilService) {

  }

  public set matricula(matricula: any) {
    this.form.controls.matricula.patchValue(matricula);
  }

  protected alterar(): void {
    if (this.validaTela()) {

      let entity: Login = {
        matricula: this.form.getRawValue().matricula,
        senha: this.form.getRawValue().senha,
        senhaNova: this.form.getRawValue().senhaNova
      }

      this.loginSerivce.alterarSenha(entity).subscribe(ret => {
        console.log(ret)
        if (ret.mensagem.toLocaleLowerCase() === 'ok') {
          this.ref.close(true);
        } else {
          this.util.showMensagem(ret.mensagem);
        }
      })
    }
  }

  private validaTela(): boolean {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  protected fecha(): void {
    this.ref.close(false);
  }
}
