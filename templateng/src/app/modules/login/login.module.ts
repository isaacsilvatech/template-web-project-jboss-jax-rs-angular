import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';

import { LoginAlteraSenhaVencidaComponent } from './login-altera-senha-vencida/login-altera-senha-vencida.component';
import { LoginAlteraSenhaComponent } from './login-altera-senha/login-altera-senha.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../shared/components/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    LoginAlteraSenhaComponent,
    LoginAlteraSenhaVencidaComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    PasswordModule,
  ],
})
export class LoginModule { }
