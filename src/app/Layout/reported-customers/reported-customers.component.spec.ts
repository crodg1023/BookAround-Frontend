import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedCustomersComponent } from './reported-customers.component';

describe('ReportedCustomersComponent', () => {
  let component: ReportedCustomersComponent;
  let fixture: ComponentFixture<ReportedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
