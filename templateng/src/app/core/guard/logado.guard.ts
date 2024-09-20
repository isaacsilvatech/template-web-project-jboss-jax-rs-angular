import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PessoaLogadaService } from '../service/pessoa-logada.service';

export const loagadoGuard: CanMatchFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const pessoaLogada = inject(PessoaLogadaService);

  if (auth.isTokenValido()) {
    router.navigateByUrl("modulos");
    return false;
  }

  pessoaLogada.removePessoaLogada();
  auth.removeToken();

  return true;
}

