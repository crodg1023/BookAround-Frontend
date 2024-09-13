import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentsGroupComponent } from '../../Components/Utils/appointments-group/appointments-group.component';
import { DateTime } from 'luxon';
import { Appointment } from '../../Interfaces/appointment';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../../Services/Appointments/appointment.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    AppointmentsGroupComponent,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  today!: DateTime;
  startOfWeek!: DateTime;
  endOfWeek!: DateTime;
  appointments!: Appointment[];
  isClient!: boolean;
  isLoading!: boolean;
  subscription!: Subscription;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.checkUserRole();
    this.subscription = this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.appointments = this.filterAppointments(appointments);
      this.isLoading = false;
    });
    this.getTodayDate();
    this.getStartAndEndOfWeek();
  }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }
  getTodayDate() {
    this.today = DateTime.now();
  }
  getStartAndEndOfWeek() {
    this.startOfWeek = DateTime.now().startOf('week');
    this.endOfWeek = DateTime.now().endOf('week');
  }
  filterAppointments(appointments: Appointment[]) {
    if (this.isClient) {
      const clientId = Number(sessionStorage.getItem('client_id')) || 0;
      return appointments.filter(x => x.client?.id === 1); // CAMBIAR!!!
    } else {
      const businessId = Number(sessionStorage.getItem('business_id')) || 0;
      return appointments.filter(x => x.business?.id === businessId);
    }
  }
  getWeekAppointments() {
    return this.appointments.filter(x => {
      const appointmentISODate = x.dateTime.replace(' ', 'T');
      const appointmentDate = DateTime.fromISO(appointmentISODate);
      return appointmentDate >= this.startOfWeek && appointmentDate <= this.endOfWeek;
    });
  }
  getTodaysAppointments() {
    return this.appointments.filter(x => {
      const appointmentISODate = x.dateTime.replace(' ', 'T');
      const appointmentDate = DateTime.fromISO(appointmentISODate);
      const startOfDay = this.today.startOf('day');
      const endOfDay = this.today.endOf('day');

      return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
