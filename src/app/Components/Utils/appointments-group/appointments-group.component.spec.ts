import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsGroupComponent } from './appointments-group.component';

describe('AppointmentsGroupComponent', () => {
  let component: AppointmentsGroupComponent;
  let fixture: ComponentFixture<AppointmentsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
