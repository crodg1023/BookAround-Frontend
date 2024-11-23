import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '../../Components/Utils/appointment-card/appointment-card.component';
import { AppointmentsGroupComponent } from '../../Components/Utils/appointments-group/appointments-group.component';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../Services/Business/business.service';
import { UsersService } from '../../Services/Users/users.service';
import { Business } from '../../Interfaces/business';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StarsService } from '../../Services/Stars/stars.service';
import { AppointmentService } from '../../Services/Appointments/appointment.service';
import { Appointment } from '../../Interfaces/appointment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [CommonModule, AppointmentsGroupComponent, NgxSkeletonLoaderModule],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.scss'
})
export class AccountSummaryComponent implements OnInit {

  isClient!: boolean;
  appointments: Appointment[] = [];
  businessInfo!: Business;
  isLoading: boolean = false;

  constructor(
    private businessService: BusinessService,
    private usersService: UsersService,
    private starsService: StarsService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.checkUserRole();
    this.getUserInformation();
  }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }

  getUserInformation() {
    if (this.isClient) {
      //
    } else {
      const id = sessionStorage.getItem('business_id');
      if (id) this.businessService.getBusinessById(+id).subscribe(info => {
        this.businessInfo = info;
        this.isLoading = false;
      });
    }
  }

  fetchAppointments() {
    if (this.isClient) {
      this.appointmentService.getCustomerAppointments(Number(sessionStorage.getItem('client_id'))).subscribe(appointments => {
        this.appointments = appointments
        this.isLoading = false;
      });
    } else {
      this.appointmentService.getBusinessAppointments(Number(sessionStorage.getItem('business_id'))).subscribe(appointments => {
        this.appointments = appointments
        this.isLoading = false;
      });
    }
  }

  getScoreStars() {
    return this.starsService.getScoreStars(this.businessInfo.score || 0);
  }

  getTodaysAppointments() {
    return this.appointments.filter(x => {
      const appointmentISODate = x.dateTime.replace(' ', 'T');
      const appointmentDate = DateTime.fromISO(appointmentISODate);
      const startOfDay = DateTime.now().startOf('day');
      const endOfDay = DateTime.now().endOf('day');

      return appointmentDate >= startOfDay && appointmentDate <= endOfDay;
    });
  }

  getWeekAppointments() {
    return this.appointments.filter(x => {
      const appointmentISODate = x.dateTime.replace(' ', 'T');
      const appointmentDate = DateTime.fromISO(appointmentISODate);
      const startOfWeek = DateTime.now().startOf('week');
      const endOfWeek = DateTime.now().endOf('week');
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    });
  }
}
