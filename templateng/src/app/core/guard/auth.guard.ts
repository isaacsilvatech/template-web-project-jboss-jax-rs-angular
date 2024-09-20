import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PessoaLogadaService } from '../service/pessoa-logada.service';

export const authGuard: CanMatchFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);
  const pessoaLogada = inject(PessoaLogadaService);

  if (!auth.isTokenValido()) {
    pessoaLogada.removePessoaLogada();
    auth.removeToken();
    router.navigateByUrl("/login");
    return false;
  }

  return true;
}
