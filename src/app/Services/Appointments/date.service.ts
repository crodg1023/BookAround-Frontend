import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private appointmentDate = new BehaviorSubject<DateTime>(DateTime.now());
  appointmentDate$ = this.appointmentDate.asObservable();

  updateAppointmentDate(newDate: DateTime) {
    this.appointmentDate.next(newDate);
  }
}
