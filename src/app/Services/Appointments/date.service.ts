import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private appointmentDate = new BehaviorSubject<string>('');
  appointmentDate$ = this.appointmentDate.asObservable();

  updateAppointmentDate(newDate: string) {
    this.appointmentDate.next(newDate);
  }
}
