import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { HistoryAppointmentCardComponent } from '../../Utils/history-appointment-card/history-appointment-card.component';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments-history',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    HistoryAppointmentCardComponent
  ],
  templateUrl: './appointments-history.component.html',
  styleUrl: './appointments-history.component.scss'
})
export class AppointmentsHistoryComponent {

  modalTitle = 'Historial de tus citas';
  modalIlustrationPath = 'assets/images/bookaround-appointment-history.jpg'
  appointments : Appointment[] = [];
  currentDate: DateTime = DateTime.now();
  selectedYear = this.currentDate.year;
  selectedMonth = this.currentDate.month;
  appointmentsPerPage = 4;
  currentPage = 1;

  filterdAppointments() {
    return this.appointments.filter(x => {
      const dateTime = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');
      return dateTime.month === this.selectedMonth && dateTime.year === this.selectedYear;
    });
  }

  pagedAppointments() {
    const start = (this.currentPage - 1) * this.appointmentsPerPage;
    const end = start + this.appointmentsPerPage;

    return this.filterdAppointments().slice(start, end);
  }
  decreaseYear() {
    this.currentDate = this.currentDate.minus({ year: 1 });
    this.selectedYear = this.currentDate.year;
    this.currentPage = 1;
  }
  increaseYear() {
    this.currentDate = this.currentDate.plus({ year: 1 });
    this.selectedYear = this.currentDate.year;
    this.currentPage = 1;
  }
  decreaseMonth() {
    this.currentDate = this.currentDate.minus({ month: 1 });
    this.selectedMonth = this.currentDate.month;
    this.currentPage = 1;
  }
  increaseMonth() {
    this.currentDate = this.currentDate.plus({ month: 1 });
    this.selectedMonth = this.currentDate.month;
    this.currentPage = 1;
  }
  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  totalPages() {
    return Math.ceil(this.filterdAppointments().length / this.appointmentsPerPage);
  }
  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  goToNext() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }
  goToPage(page: number) {
    if (page <= this.totalPages()) {
      this.currentPage = page;
    }
  }
}
