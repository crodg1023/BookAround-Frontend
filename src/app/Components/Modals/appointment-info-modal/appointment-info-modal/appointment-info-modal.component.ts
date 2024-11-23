import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { Appointment } from '../../../../Interfaces/appointment';
import { DateTime } from 'luxon';
import { AppointmentService } from '../../../../Services/Appointments/appointment.service';
import { ModalService } from '../../../../Services/modal.service';
import { CalendarComponent } from '../../../Utils/calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { DateService } from '../../../../Services/Appointments/date.service';
import { AuthService } from '../../../../Services/Auth/auth.service';

@Component({
  selector: 'app-appointment-info-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    CalendarComponent
  ],
  templateUrl: './appointment-info-modal.component.html',
  styleUrl: './appointment-info-modal.component.scss'
})
export class AppointmentInfoModalComponent implements OnInit {

  userRole!: string;
  appointment!: Appointment;
  headerTitle!: string;
  primaryButtonText!: string;
  hasSecondaryButton: boolean = true;
  secondaryButtonText: string = 'Re agendarla';
  modalSubtitle!: string;
  modalSubtitleIcon!: string;
  appointmentIsCanceled: boolean = false;
  currentStep: number = 2;
  selectedHourIndex: number = -1;
  selectedPeopleIndex: number = -1;
  dayHours: string[] = [];
  numberOfPeople: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  appointmentDate!: DateTime;

  constructor(
    private appointmentService: AppointmentService,
    private modalService: ModalService,
    private dateService: DateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.modalService.currentModalStep$.subscribe(step => {
      this.currentStep = step;
      this.updateModalInformation();
    });
    this.authService.userRole$.subscribe(x => this.userRole = x);
    this.dateService.appointmentDate$.subscribe(dateTime => this.appointmentDate = dateTime);
    this.getDayHours();
  }

  get date() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm').split(' ')[0];
  }
  get hour() {
    return DateTime.fromFormat(this.appointment.dateTime, 'yyyy-MM-dd HH:mm:ss').toFormat('dd/MM/yyyy HH:mm').split(' ')[1];
  }

  getDayHours() {
    for (let i = 0; i < 24; i++) {
      this.dayHours.push(DateTime.now().set({ hour: i, minute: 0 }).toFormat('HH:mm'));
    }
  }

  onHourSelected(index: number) {
    this.selectedHourIndex = index;
  }

  onPeopleSelected(index: number) {
    this.selectedPeopleIndex = index;
  }

  primaryAction = () => {
    switch(this.currentStep) {
      case 1:
        this.cancelAppointment();
        break;
      case 2:
        this.goToRescheduleAppointment();
        break;
      case 3:
        this.goToRescheduleAppointment();
        break;
      case 4:
        this.rescheduleAppointment();
        break;
      case 5:
        this.closeModal();
        break;
      case 6:
        this.closeModal();
        break;
    }
    this.updateModalInformation();
  }

  cancelAppointment() {
    this.appointmentService.deleteAppointment(this.appointment.id || 0).subscribe({
      next: () => {
        this.currentStep = 5;
        this.modalService.nextStep(this.currentStep);
      }
    });
  }

  rescheduleAppointment() {
    const rescheduledAppointment = {
      dateTime: this.getIsoDate(),
      people: this.numberOfPeople[this.selectedPeopleIndex]
    };

    console.log(rescheduledAppointment);

    this.appointmentService.updateAppointment((this.appointment.id ?? 0), rescheduledAppointment).subscribe({
      next: () => {
        this.currentStep = 6;
        this.modalService.nextStep(this.currentStep);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToRescheduleAppointment = () => {
    this.currentStep++;
    this.modalService.nextStep(this.currentStep);
    this.hasSecondaryButton = false;
  }

  closeModal() {
    this.modalService.closeModal('appointmentInfo');
  }

  updateModalInformation() {
    switch(this.currentStep) {
      case 1:
        this.headerTitle = 'Detalles de tu cita';
        this.primaryButtonText = 'Cancelarla';
        break;
      case 2:
        this.headerTitle = 'Volvamos a agendar tu cita';
        this.modalSubtitle = 'Selecciona el día';
        this.modalSubtitleIcon = 'fa-solid fa-calendar-days';
        this.primaryButtonText = 'Continuar';
        break;
      case 3:
        this.modalSubtitle = 'Selecciona una hora';
        this.modalSubtitleIcon = 'fa-solid fa-clock';
        this.primaryButtonText = 'Continuar';
        break;
      case 4:
        this.modalSubtitle = '¿Cuántas personas son?';
        this.modalSubtitleIcon = 'fa-solid fa-user-group';
        this.primaryButtonText = 'Re agendar mi cita';
        break;
      case 5:
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
        this.headerTitle = 'Tu cita ha sido cancelada';
        this.primaryButtonText = 'Cerrar';
        break;
      case 6:
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
        this.headerTitle = '¡Tu cita ha sido re agendada con éxito!';
        this.primaryButtonText = 'Cerrar';
        break;
    }
  }

  getIsoDate() {
    const fullDateAndHourString = `${this.appointmentDate.toFormat('MM/dd/yyyy')} ${this.dayHours[this.selectedHourIndex]}`;
    console.log(fullDateAndHourString);
    const fullDateAndHour = DateTime.fromFormat(fullDateAndHourString, 'MM/dd/yyyy HH:mm');

    return fullDateAndHour.toISO() || '';
  }
}
