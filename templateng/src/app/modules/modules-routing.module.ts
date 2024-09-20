import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      // {
      //   path: 'exemplo',
      //   loadChildren: () => import('./exemplo/exemplo.module').then(m => m.ExemploModule),
      //   data: { icon: 'pi pi-home', label: 'Exemplo' }
      // }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
