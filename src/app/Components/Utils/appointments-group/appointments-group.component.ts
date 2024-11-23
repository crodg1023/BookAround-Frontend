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
  @Input() isWeekly!: boolean;
  @Input() appointmentsAreClickable: boolean = false;
  displayedAppointments: Appointment[] = [];
  currentDate = DateTime.now();
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
        return date.year === this.currentDate.year && date.month === this.currentDate.month && date.startOf('day') < this.currentDate.startOf('day');
      }).slice(0, 5);
    } else {
      this.displayedAppointments = this.appointments;
    }
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
