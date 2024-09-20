import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { PermissaoService } from '../service/permissao.service';
import { UtilService } from '../service/util.service';

export const permissaoGuard: CanMatchFn = (route) => {

  const service = inject(PermissaoService);
  const util = inject(UtilService);
  const router = inject(Router);

  if (route.data && route.data['chave']) {
    return service.isPermitido(route.data['chave']).pipe(tap(b => {
      if (!b) {
        util.showMensagem("Você não tem permissão para acessar esse módulo!");
        router.navigateByUrl(router.url);
      }
    }))
  }

  return true;
};
