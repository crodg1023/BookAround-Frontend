import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompleteProfileService } from '../../Services/Business/complete-profile.service';

export const completeProfileGuard: CanActivateFn = (route, state) => {

  let canAccessToCompleteProfile: boolean = false;
  inject(CompleteProfileService).canAccessToCompleteProfile$.subscribe(value => canAccessToCompleteProfile = value)
  console.log(canAccessToCompleteProfile);

  if (canAccessToCompleteProfile) {
    return true;
  } else {
    inject(Router).navigate(['/']);
    return false;
  }
};
