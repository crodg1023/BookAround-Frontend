import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const requiredRole: string[] = route.data['role'];
  let userRole = '';
  inject(AuthService).userRole$.subscribe(x => userRole = x);



  if (!requiredRole.includes(userRole)) {
    inject(Router).navigate(['/']);
    return false;
  }

  return true;
};
