import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAlteraSenhaVencidaComponent } from './login-altera-senha-vencida/login-altera-senha-vencida.component';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { AuthService } from '../../core/service/auth.service';
import { PessoaLogadaService } from '../../core/service/pessoa-logada.service';
import { UtilService } from '../../core/service/util.service';
import { DialogService } from '../../shared/components/dialog/services/dialog.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'cmp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  protected form = new FormGroup({
    matricula: new FormControl<number>(null, Validators.required),
    senha: new FormControl<string>(null, Validators.required)
  });

  protected title: string;
  protected icon: string;

  constructor(
    private app: AppComponent,
    private loginService: LoginService,
    private auth: AuthService,
    private pessoaLogada: PessoaLogadaService,
    private util: UtilService,
    private router: Router,
    private dialog: DialogService
  ) {
    this.title = this.app.title;
    this.icon = this.app.icon;
  }

  public login(): void {
    if (this.validaTela()) {

      this.loginService.check(this.form.getRawValue() as Login).subscribe(login => {

        if (login.mensagem == "ok") {
          this.auth.setToken(login.token);
          this.pessoaLogada.setPessoaLogada(this.auth.getMatricula());
          this.router.navigateByUrl("modulos");

        } else if (login.mensagem == "ATUALIZAR_SENHA") {

          let ref = this.dialog.open(LoginAlteraSenhaVencidaComponent, {
            icon: 'pi pi-key',
            title: 'Alterar senha',
            width: '300px',
            height: 'auto',
            closeButton: true
          });

          ref.componentInstance.matricula = this.form.getRawValue().matricula;
          ref.componentInstance.senha = this.form.getRawValue().senha;

          ref.onClose.subscribe((login: Login) => {
            if (login) {
              this.auth.setToken(login.token);
              this.pessoaLogada.setPessoaLogada(this.auth.getMatricula());
              this.router.navigateByUrl("modulos");
            }
          })

        } else {
          this.util.showMensagem(login.mensagem);
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
}
