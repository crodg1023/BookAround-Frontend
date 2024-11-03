import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-schedule-appointment-modal',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './schedule-appointment-modal.component.html',
  styleUrl: './schedule-appointment-modal.component.scss'
})
export class ScheduleAppointmentModalComponent {

  modalTitle: string = 'Agenda tu cita';
  modalSubtitle: string = 'Selecciona una hora';
  modalSubtitleIcon: string = 'fa-solid fa-clock';
  buttonText: string = 'Siguiente';
}
