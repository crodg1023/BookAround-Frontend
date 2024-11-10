import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAppointmentCardComponent } from './history-appointment-card.component';

describe('HistoryAppointmentCardComponent', () => {
  let component: HistoryAppointmentCardComponent;
  let fixture: ComponentFixture<HistoryAppointmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryAppointmentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryAppointmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
