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
    this.fetchAppointments();
    this.getTodayDate();
    this.getStartAndEndOfWeek();
  }

  fetchAppointments() {
    if (this.isClient) {
      this.subscription = this.appointmentService.getCustomerAppointments(Number(sessionStorage.getItem('client_id'))).subscribe(appointments => {
        this.appointments = appointments
        this.isLoading = false;
      });
    } else {
      this.subscription = this.appointmentService.getBusinessAppointments(Number(sessionStorage.getItem('business_id'))).subscribe(appointments => {
        this.appointments = appointments
        this.isLoading = false;
      });
    }
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
