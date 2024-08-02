import { TestBed } from '@angular/core/testing';

import { CategoryIconsService } from './category-icons.service';

describe('CategoryIconsService', () => {
  let service: CategoryIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
