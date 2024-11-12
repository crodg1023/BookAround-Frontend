import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateService } from '../../../Services/Appointments/date.service';
import { AppointmentService } from '../../../Services/Appointments/appointment.service';
import { Appointment } from '../../../Interfaces/appointment';
import { AuthService } from '../../../Services/Auth/auth.service';
import { switchMap } from 'rxjs';
import { Credentials } from '../../../Interfaces/credentials';

@Component({
  selector: 'app-schedule-appointment-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    PasswordInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './schedule-appointment-modal.component.html',
  styleUrl: './schedule-appointment-modal.component.scss'
})
export class ScheduleAppointmentModalComponent implements OnInit {

  scheduleAppointmentForm!: FormGroup;
  appointmentDate!: DateTime;
  businessId!: number;
  modalTitle: string = 'Agenda tu cita';
  modalSubtitle!: string;
  modalSubtitleIcon!: string;
  modalButtonText: string = 'Continuar';
  modalButtonIsDisabled: boolean = true;
  userIsLogged: boolean = false;
  appointmentBookingFailure: boolean = false;
  selectedHourIndex: number = -1;
  selectedPeopleIndex: number = -1;
  dayHours: string[] = [];
  numberOfPeople: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  currentStep: number = 1;
  lastStep: number = 4;
  today: DateTime = DateTime.now();

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => this.userIsLogged = isLogged);

    this.modalService.currentModalStep$.subscribe(step => {
      this.currentStep = step;
      this.updateModalInformation();
      this.updateButtonDisabling();
    });

    this.dateService.appointmentDate$.subscribe(appointmentDate => this.appointmentDate = appointmentDate);

    this.scheduleAppointmentForm = this.formBuilder.group({
      loginEmail: ['', Validators.email],
      loginPassword: [''],
      replacementEmail: ['', Validators.email]
    });

    this.scheduleAppointmentForm.valueChanges.subscribe(() => this.updateButtonDisabling());
    this.getDayHours();
  }

  get loginEmail() { return this.scheduleAppointmentForm.get('loginEmail'); }
  get loginPassword() { return this.scheduleAppointmentForm.get('loginPassword'); }
  get replacementEmail() { return this.scheduleAppointmentForm.get('replacementEmail'); }

  getDayHours() {
    for (let i = 0; i < 24; i++) {
      this.dayHours.push(DateTime.now().set({ hour: i, minute: 0 }).toFormat('HH:mm'));
    }
  }

  parseHour(hourString: string) {
    const hour = hourString.split(':');
    return +hour[0];
  }

  onHourSelected(index: number) {
    this.selectedHourIndex = index;
    this.updateButtonDisabling();
  }

  onPeopleSelected(index: number) {
    this.selectedPeopleIndex = index;
    this.updateButtonDisabling();
  }

  nextStep() {
    if (this.currentStep === 2 && this.userIsLogged) {
      this.scheduleAppointment();
    } else if (this.currentStep === 3 && !this.userIsLogged) {
      this.scheduleAppointment();
    } else if (this.currentStep < this.lastStep) {
      this.currentStep++;
      this.modalService.nextStep(this.currentStep);
    }

    if (this.currentStep === this.lastStep) {
      this.closeModal();
    }

    this.updateModalInformation();
  }

  scheduleAppointment() {
    this.modalButtonIsDisabled = true;
    if (this.userIsLogged) {
      this.loggedInUserScheduleAppointment();
    } else {
      this.guestUserScheduleAppointment();
    }
  }

  guestUserScheduleAppointment() {
    const appointment: Appointment = {
      comercio_id: this.businessId,
      dateTime: this.getIsoDate(),
      status: 'active',
      people: this.numberOfPeople[this.selectedPeopleIndex],
      reservation_email: this.replacementEmail?.value
    }

    this.appointmentService.postNewAppointment(appointment).subscribe({
      next: () => {
        this.currentStep = this.lastStep;
        this.modalService.nextStep(this.currentStep);
      },
      error: () => {
        this.appointmentBookingFailure = true;
        this.currentStep = this.lastStep;
        this.modalService.nextStep(this.currentStep);
      }
    });
  }

  loggedInUserScheduleAppointment() {
    const clientId = Number(sessionStorage.getItem('client_id') || 0);
    const email = sessionStorage.getItem('email');

    const appointment: Appointment = {
      comercio_id: this.businessId,
      cliente_id: clientId,
      dateTime: this.getIsoDate(),
      status: 'active',
      people: this.numberOfPeople[this.selectedPeopleIndex],
      reservation_email: email || ''
    }

    this.appointmentService.postNewAppointment(appointment).subscribe({
      next: () => {
        this.currentStep = this.lastStep;
        this.modalService.nextStep(this.currentStep);
      },
      error: () => {
        this.appointmentBookingFailure = true;
        this.currentStep = this.lastStep;
        this.modalService.nextStep(this.currentStep);
      }
    });
  }

  onLoginToSchedule() {
    if (this.loginEmail?.value && this.loginEmail.valid && this.loginPassword?.value) {
      const userCredentials: Credentials = {
        email: this.loginEmail.value,
        password: this.loginPassword.value
      };

      this.authService.login(userCredentials).pipe(
        switchMap(user => {
          const appointment: Appointment = {
            comercio_id: this.businessId,
            cliente_id: user.client_id,
            dateTime: this.getIsoDate(),
            status: 'active',
            people: this.numberOfPeople[this.selectedPeopleIndex],
            reservation_email: user.email
          }

          return this.appointmentService.postNewAppointment(appointment);
        })
      ).subscribe({
        next: () => {
          this.currentStep = this.lastStep;
          this.modalService.nextStep(this.currentStep);
        },
        error: () => {
          this.appointmentBookingFailure = true;
          this.currentStep = this.lastStep;
          this.modalService.nextStep(this.currentStep);
        }
      });
    }
  }

  closeModal() {
    this.modalService.closeModal('appointmentSchedule');
  }

  updateButtonDisabling() {
    switch (this.currentStep) {
      case 1:
        this.modalButtonIsDisabled = this.selectedHourIndex < 0;
        break;
      case 2:
        this.modalButtonIsDisabled = this.selectedPeopleIndex < 0;
        break;
      case 3:
        this.validateForm();
        break;
      case 4:
        this.modalButtonIsDisabled = false;
        break;
      default:
        this.modalButtonIsDisabled = true;
    }
  }

  updateModalInformation() {
    switch (this.currentStep) {
      case 1:
        this.modalSubtitle = 'Selecciona una hora';
        this.modalSubtitleIcon = 'fa-solid fa-clock';
        break;
      case 2:
        this.modalSubtitle = '¿Cuántas personas son?';
        this.modalSubtitleIcon = 'fa-solid fa-user-group';
        break;
      case 3:
        this.modalSubtitle = 'Iniciar sesión';
        this.modalSubtitleIcon = 'fa-solid fa-user';
        this.modalButtonText = 'Agendar mi cita';
        break;
      case this.lastStep:
        this.appointmentBookingFailure ? this.modalTitle = '¡Ups! Parece que algo ha salido mal' : this.modalTitle = '¡Tu cita ha sido agendada con éxito!';
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
        this.modalButtonText = 'Finalizar';
        break;
      default:
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
    }
  }

  validateForm() {
    if (this.replacementEmail?.value && this.replacementEmail.valid) {
      this.modalButtonIsDisabled = false;
    } else {
      this.modalButtonIsDisabled = true;
    }
  }

  getIsoDate() {
    const fullDateAndHourString = `${this.appointmentDate.toFormat('MM/dd/yyyy')} ${this.dayHours[this.selectedHourIndex]}`;
    const fullDateAndHour = DateTime.fromFormat(fullDateAndHourString, 'MM/dd/yyyy HH:mm');

    return fullDateAndHour.toISO() || '';
  }

  checkDisabledHour(hour: string) {
    return this.appointmentDate.hasSame(this.today, 'day') && this.parseHour(hour) <= this.today.hour;
  }
}
