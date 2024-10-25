import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const usuarioLogadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 


  if(sessionStorage.getItem('perfilUsuarioLogado')){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
