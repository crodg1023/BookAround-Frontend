import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MockService } from '../../Services/Mocks/mock.service';
import { Business } from '../../Interfaces/business';

export const businessResolver: ResolveFn<Business[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(MockService).getBusiness();
};

export const businessInformationResolver : ResolveFn<Business> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(MockService).getBusinessById(+(route.paramMap.get('id') || 0));
};
