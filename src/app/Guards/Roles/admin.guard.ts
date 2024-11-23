import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let userRole = '';
  inject(AuthService).userRole$.subscribe(x => userRole = x);

  if (userRole !== 'admin') {
    inject(Router).navigate(['/']);
    return false;
  }

  return true;
};
