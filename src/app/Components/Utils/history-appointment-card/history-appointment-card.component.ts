import { Component, Input } from '@angular/core';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-appointment-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './history-appointment-card.component.html',
  styleUrl: './history-appointment-card.component.scss'
})
export class HistoryAppointmentCardComponent {

  @Input() appointment!: Appointment;

  getDate() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm').split(' ')[0];
  }
  getHour() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm').split(' ')[1];
  }
  getStatusColor() {
    switch (this.appointment.status) {
      case 'active':
        return 'g1-bg';
      case 'canceled':
        return 'r1-bg';
      case 'fulfilled':
        return 'bg-blue-400';
    }
  }
}
