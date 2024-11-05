import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { ModalService } from '../../../Services/modal.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DateService } from '../../../Services/Appointments/date.service';
import { AppointmentService } from '../../../Services/Appointments/appointment.service';
import { Appointment } from '../../../Interfaces/appointment';

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
  appointmentDate!: string;
  businessId!: number;
  modalTitle: string = 'Agenda tu cita';
  modalSubtitle!: string;
  modalSubtitleIcon!: string;
  modalButtonText: string = 'Continuar';
  modalButtonIsDisabled: boolean = false;
  selectedHourIndex: number = -1;
  selectedPeopleIndex: number = -1;
  dayHours: string[] = [];
  numberOfPeople: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  currentStep: number = 1;
  lastStep: number = 4;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
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

  onHourSelected(index: number) {
    this.selectedHourIndex = index;
    console.log(this.dayHours[index]);
    this.updateButtonDisabling();
  }

  onPeopleSelected(index: number) {
    this.selectedPeopleIndex = index;
    console.log(this.numberOfPeople[index]);
    this.updateButtonDisabling();
  }

  nextStep() {
    if (this.currentStep < this.lastStep) {
      this.currentStep++;
      this.modalService.nextStep(this.currentStep);
    } else {
      this.scheduleAppointment();
    }
    this.updateModalInformation();
  }

  scheduleAppointment() {
    const appointment: Appointment = {
      comercio_id: this.businessId,
      dateTime: this.getIsoDate(),
      status: 'active',
      people: this.numberOfPeople[this.selectedPeopleIndex],
      reservation_email: this.loginEmail?.value || this.replacementEmail?.value
    }

    console.log(this.getIsoDate());

    this.appointmentService.postNewAppointment(appointment).subscribe({
      next: () => {
        this.currentStep = this.lastStep;
        this.modalService.nextStep(this.currentStep);
        this.closeModal();
      }
    });
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
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
        this.modalTitle = '¡Tu cita ha sido agendada con éxito!'
        this.modalButtonText = 'Finalizar';
        break;
      default:
        this.modalSubtitle = '';
        this.modalSubtitleIcon = '';
    }
  }

  validateForm() {
    if ((this.loginEmail?.value && this.loginEmail.valid) && this.loginPassword?.value && !this.replacementEmail?.value) {
      this.modalButtonIsDisabled = false;
    } else if ((this.replacementEmail?.value && this.replacementEmail.valid) && !this.loginEmail?.value && !this.loginPassword?.value) {
      this.modalButtonIsDisabled = false;
    } else {
      this.modalButtonIsDisabled = true;
    }
  }

  getIsoDate() {
    const fullDateAndHourString = `${this.appointmentDate} ${this.dayHours[this.selectedHourIndex]}`;
    const fullDateAndHour = DateTime.fromFormat(fullDateAndHourString, 'MM/dd/yyyy HH:mm');

    return fullDateAndHour.toISO() || '';
  }
}
