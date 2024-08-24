import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MockService } from '../../Services/Mocks/mock.service';
import { Business } from '../../Interfaces/business';
import { BusinessService } from '../../Services/Business/business.service';

export const businessResolver: ResolveFn<Business[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(BusinessService).getAllBusiness();
};

export const businessInformationResolver : ResolveFn<Business> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(BusinessService).getBusinessById(+(route.paramMap.get('id') || 0));
};
