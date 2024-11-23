import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInfoModalComponent } from './appointment-info-modal.component';

describe('AppointmentInfoModalComponent', () => {
  let component: AppointmentInfoModalComponent;
  let fixture: ComponentFixture<AppointmentInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
