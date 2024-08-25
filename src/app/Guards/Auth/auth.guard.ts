import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let isLogged: boolean = false;
  inject(AuthService).isLogged$.subscribe(value => isLogged = value);

  if (isLogged) return true;
  else {
    inject(Router).navigate(['/']);
    return false;
  }
};
