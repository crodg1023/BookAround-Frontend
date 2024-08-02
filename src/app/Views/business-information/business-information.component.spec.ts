import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInformationComponent } from './business-information.component';

describe('BusinessInformationComponent', () => {
  let component: BusinessInformationComponent;
  let fixture: ComponentFixture<BusinessInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
