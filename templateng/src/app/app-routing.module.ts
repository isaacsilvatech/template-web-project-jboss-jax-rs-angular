import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loagadoGuard } from './core/guard/logado.guard';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canMatch: [loagadoGuard]
  }, 
  {
    path: 'modulos',
    loadChildren: () => import("./modules/modules.module").then(m => m.ModulesModule),
    canMatch: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
