import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { businessResolver } from './business.resolver';

describe('businessResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => businessResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
