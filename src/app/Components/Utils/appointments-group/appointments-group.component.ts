import { Component, Input, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-appointments-group',
  standalone: true,
  imports: [AppointmentCardComponent],
  templateUrl: './appointments-group.component.html',
  styleUrl: './appointments-group.component.scss'
})
export class AppointmentsGroupComponent implements OnInit {

  @Input() appointments!: Appointment[];
  @Input() isHistory!: boolean;
  @Input() year!: number;
  displayedAppointments: Appointment[] = [];
  month = DateTime.now().monthLong
  day = DateTime.now().day
  dayString = DateTime.now().weekdayLong;

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    if (this.isHistory) {
      this.displayedAppointments = this.appointments.filter(x => {
        const isoDate = x.dateTime.replace(' ', 'T');
        const date = DateTime.fromISO(isoDate);
        return date.year === this.year;
      });
    } else {
      this.displayedAppointments = this.appointments;
    }
  }
}
