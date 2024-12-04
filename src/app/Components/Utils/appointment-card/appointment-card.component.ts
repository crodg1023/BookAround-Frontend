import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';
import { AppointmentInfoModalComponent } from '../../Modals/appointment-info-modal/appointment-info-modal/appointment-info-modal.component';
import { ModalService } from '../../../Services/modal.service';
import { AuthService } from '../../../Services/Auth/auth.service';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentInfoModalComponent
  ],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss'
})
export class AppointmentCardComponent implements OnInit {

  @ViewChild('appointmentInfoContainer', { read: ViewContainerRef, static: true }) appointmentInfoContainer!: ViewContainerRef;
  appointmentInfoRef!: ComponentRef<AppointmentInfoModalComponent>;
  @Input() status!: string;
  @Input() appointment!: Appointment;
  @Input() isClickable: boolean = false;
  userRole: string = '';

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    this.authService.userRole$.subscribe(x => this.userRole = x);
  }
  getAppointmentDateTime() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm');
  }
  getAppointmentTitle() {
    if (this.userRole === 'customer') {
      return this.appointment.business?.name
    } else {
      return this.appointment.client?.name || this.appointment.reservation_email
    }
  }

  openAppointmentInfo() {
    if (this.isClickable) {
      if (this.appointmentInfoRef) {
        this.appointmentInfoRef.destroy();
      }
      this.appointmentInfoContainer.clear();
      this.appointmentInfoRef = this.appointmentInfoContainer.createComponent(AppointmentInfoModalComponent);
      this.appointmentInfoRef.instance.appointment = this.appointment;
      this.modalService.openModal('appointmentInfo');
    }
  }
}
