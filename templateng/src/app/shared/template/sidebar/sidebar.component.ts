import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpDestroyerService } from '../../../core/http/http-destroyer.service';
import { Pessoa } from '../../../core/model/pessoa.model';
import { AuthService } from '../../../core/service/auth.service';
import { PessoaLogadaService } from '../../../core/service/pessoa-logada.service';
import { LoginAlteraSenhaComponent } from '../../../modules/login/login-altera-senha/login-altera-senha.component';
import { DialogService } from '../../components/dialog/services/dialog.service';
import { SidebarGroup } from './sidebar.model';
import { SidebarService } from './sidebar.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'cmp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ width: '45px', minHeight: '0' })),
      state('expanded', style({ width: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SidebarComponent {

  protected groups$: Observable<SidebarGroup[]>;
  protected pessoaLogada$: Observable<Pessoa>;

  protected title: string;
  protected menuOpen: boolean = true;

  constructor(
    private app: AppComponent,
    private sidebar: SidebarService,
    private pessoaLogada: PessoaLogadaService,
    private auth: AuthService,
    private router: Router,
    private httpDestroyer: HttpDestroyerService,
    private dialog: DialogService
  ) {
    this.title = this.app.title;
    this.groups$ = this.sidebar.getGroups();
    this.pessoaLogada$ = this.pessoaLogada.getPessoaLogada();
  }

  protected menu() {
    this.menuOpen = !this.menuOpen;
  }

  protected logout(): void {
    this.auth.removeToken();
    this.router.navigateByUrl("/login");
    this.httpDestroyer.destroy();
  }

  protected alteraSanha(matricula: number): void {
    let ref = this.dialog.open(LoginAlteraSenhaComponent, {
      icon: 'pi pi-key',
      title: 'Alterar senha',
      width: '300px',
      height: 'auto',
      closeButton: true
    });

    ref.componentInstance.matricula = matricula;

    ref.onClose.subscribe((ok) => {
      if (ok) {
        this.logout();
      }
    });
  }

  protected navigate(url: string): void {
    if (!this.router.url.includes(url)) {
      this.httpDestroyer.destroy();
    }
  }
}