import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentModalComponent } from './schedule-appointment-modal.component';

describe('ScheduleAppointmentModalComponent', () => {
  let component: ScheduleAppointmentModalComponent;
  let fixture: ComponentFixture<ScheduleAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleAppointmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
