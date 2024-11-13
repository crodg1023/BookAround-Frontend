import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class AppointmentCardComponent implements OnInit {
  @Input() status!: string;
  @Input() appointment!: Appointment;
  @Input() isClickable: boolean = false;
  isClient!: boolean;

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    this.isClient = sessionStorage.getItem('role') === 'customer';
  }
  getAppointmentDateTime() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm');
  }
}
