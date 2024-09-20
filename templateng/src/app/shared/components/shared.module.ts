import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule as SharedPrimeModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { FocusInitModule } from '../directives/focus-init/focus-init.module';
import { InputMaskModule } from 'primeng/inputmask';
import { ProximoCampoModule } from '../directives/proximo-campo/proximo-campo.module';
import { ControleEnabledModule } from '../directives/controle-enabled/controle-enabled.module';
import { PermissaoModule } from '../directives/permissao/permissao.module';
import { PaginatorModule } from 'primeng/paginator';
import { ContainerModule } from '../layout/container/container.module';
import { GridLstModule } from '../layout/grid-lst/grid-lst.module';
import { PessoaLogadaModule } from '../directives/pessoa-logada/pessoa-logada.module';
import { GridFrmModule } from '../layout/grid-frm/grid-frm.module';




@NgModule({
  exports: [
	CommonModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    ProximoCampoModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    FormsModule,
    TableModule,
    TabViewModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    SharedPrimeModule,
    ControleEnabledModule,
    ContainerModule,
    GridLstModule,
    PessoaLogadaModule,
    GridFrmModule,
    FocusInitModule,
    PermissaoModule,
    PaginatorModule
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    ProximoCampoModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    TableModule,
    TabViewModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    SharedPrimeModule,
    ControleEnabledModule,
    ContainerModule,
    GridLstModule,
    PessoaLogadaModule,
    GridFrmModule,
    FocusInitModule,
    PermissaoModule,
    PaginatorModule
  ],
  declarations: [
  ],
})
export class SharedModule { }
