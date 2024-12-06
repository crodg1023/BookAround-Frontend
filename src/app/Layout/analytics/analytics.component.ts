import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { AppointmentService } from '../../Services/Appointments/appointment.service';
import { Appointment } from '../../Interfaces/appointment';
import { DateTime, Info } from 'luxon';
import { ReviewService } from '../../Services/Review/review.service';
import { Review } from '../../Interfaces/review';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {

  appointments!: Appointment[];
  reviews!: Review[];
  isLoadingData = false;
  currentWeekAppointmentsChart!: Chart;
  currentMonthAppointmentsChart!: Chart;
  currentYearAppointments!: Chart;
  reviewsPieChart!: Chart;

  constructor(
    private appointmentService: AppointmentService,
    private reviewsService: ReviewService
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
    this.fecthReviews();
  }

  get currentWeek() {
    return DateTime.now().toFormat('dd/MM/yyyy');
  }
  get currentMonth() {
    return DateTime.now().monthLong;
  }
  get currentYear() {
    return DateTime.now().year;
  }

  fetchAppointments() {
    const businessID: number = Number(sessionStorage.getItem('business_id') || 0);
    this.appointmentService.getBusinessAppointments(businessID).subscribe(x => {
      this.appointments = x;
      this.createCurrentWeekChart();
      this.createCurrentMonthChart();
      this.createCurrentYearChart();
    });
  }

  fecthReviews() {
    const businessID: number = Number(sessionStorage.getItem('business_id') || 0);
    this.reviewsService.getBusinessReviews(businessID).subscribe(x => {
      this.reviews = x;
      this.createReviewsPieChart();
    });
  }

  createCurrentWeekChart() {
    this.currentWeekAppointmentsChart = new Chart(
      'currentWeekAppointmentsChart',
      {
        type: 'line' as ChartType,
        data: {
          labels: Object.keys(this.getLastWeekAppointments()),
          datasets: [{
            label: this.currentWeek,
            data: Object.values(this.getLastWeekAppointments()),
            fill: false,
            borderColor: 'rgb(127, 92, 255)',
            pointRadius: 0,
            tension: 0.1
          }]
        }
      }
    );
  }

  createCurrentMonthChart() {
    this.currentMonthAppointmentsChart = new Chart(
      'currentMonthAppointmentsChart',
      {
        type: 'line' as ChartType,
        data: {
          labels: Object.keys(this.getCurrentMonthAppointments()),
          datasets: [{
            label: this.currentMonth,
            data: Object.values(this.getCurrentMonthAppointments()),
            fill: false,
            borderColor: 'rgb(127, 92, 255)',
            pointRadius: 0,
            tension: 0.1
          }]
        }
      }
    );
  }

  createCurrentYearChart() {
    this.currentYearAppointments = new Chart(
      'currentYearAppointments',
      {
        type: 'bar' as ChartType,
        data: {
          labels: Object.keys(this.getCurrentYearAppointments()),
          datasets: [{
            label: this.currentYear.toString(),
            data: Object.values(this.getCurrentYearAppointments()),
            backgroundColor: [
              'rgba(46, 55, 128, 0.2)',
              'rgba(90, 46, 128, 0.2)',
              'rgba(64, 46, 128, 0.2)',
              'rgba(117, 46, 128, 0.2)',
              'rgba(89, 78, 128, 0.2)',
              'rgba(147, 154, 212, 0.2)',
              'rgba(183, 147, 212, 0.2)',
              'rgba(147, 175, 212, 0.2)',
              'rgba(204, 147, 212, 0.2)',
              'rgba(114, 110, 128, 0.2)',
              'rgba(197, 203, 255, 0.2)',
            ],
            borderColor: [
              'rgb(46, 55, 128)',
              'rgb(90, 46, 128)',
              'rgb(64, 46, 128)',
              'rgb(117, 46, 128)',
              'rgb(89, 78, 128)',
              'rgb(147, 154, 212)',
              'rgb(183, 147, 212)',
              'rgb(147, 175, 212)',
              'rgb(204, 147, 212)',
              'rgb(114, 110, 128)',
              'rgb(197, 203, 255)',
            ],
            borderWidth: 1
          }]
        }
      }
    );
  }

  createReviewsPieChart() {
    this.reviewsPieChart = new Chart(
      'reviewsPieChart',
      {
        type: 'pie' as ChartType,
        data: {
          labels: Object.keys(this.getReviewsScores()),
          datasets: [{
            label: 'Número de reseñas por cantidad de estrellas',
            data: Object.values(this.getReviewsScores()),
            backgroundColor: [
              'rgb(214, 32, 66)',
              'rgb(204, 90, 60)',
              'rgb(194, 148, 54)',
              'rgb(54, 194, 127)',
              'rgb(110, 80, 221)',
              'rgb(64, 46, 127)'
            ],
            hoverOffset: 4
          }]
        }
      }
    );
  }

  getLastWeekAppointments() {
    const currentWeekStart = DateTime.now().startOf('week');
    const currentWeekEnd = DateTime.now().endOf('week');
    const daysOfWeek = Info.weekdays('long', { locale: 'es' });

    const appointmentsByDay = daysOfWeek.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {} as Record<string, number>);

    const currentWeekAppointments = this.appointments.filter(x => {
      const appointmentDate = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');

      return appointmentDate >= currentWeekStart && appointmentDate <= currentWeekEnd;
    });

    currentWeekAppointments.forEach(appointment => {
      const appointmentDate = DateTime.fromFormat(appointment.dateTime, 'yyyy-MM-dd HH:mm:ss');
      const day = appointmentDate.setLocale('es').toFormat('cccc');
      appointmentsByDay[day] += 1;
    });

    return appointmentsByDay;
  }

  getCurrentMonthAppointments() {
    const startOfCurrentMonth = DateTime.now().startOf('month');
    const endOfCurrentMonth = DateTime.now().endOf('month');
    const daysOfMonth = [...Array(DateTime.now().daysInMonth)].map((_, i) => i + 1);

    const appointmentsByDay = daysOfMonth.reduce((acc, day) => {
      acc[day] = 0;
      return acc;
    }, {} as Record<string, number>);

    const currentMonthAppointments = this.appointments.filter(x => {
      const appointmentDate = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');

      return appointmentDate >= startOfCurrentMonth && appointmentDate <= endOfCurrentMonth;
    });

    currentMonthAppointments.forEach(x => {
      const appointmentDate = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');
      const day = appointmentDate.day
      appointmentsByDay[day] += 1;
    });

    return appointmentsByDay;
  }

  getCurrentYearAppointments() {
    const startOfCurrentYear = DateTime.now().startOf('year');
    const endOfCurrentYear = DateTime.now().endOf('year');
    const monthsOfYear = Info.months('short', { locale: 'es' });

    const appointmentmentsByMonth = monthsOfYear.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {} as Record<string, number>);

    const currentYearAppointments = this.appointments.filter(x => {
      const appointmentDate = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');

      return appointmentDate >= startOfCurrentYear && appointmentDate <= endOfCurrentYear;
    });

    currentYearAppointments.forEach(x => {
      const appointmentDate = DateTime.fromFormat(x.dateTime, 'yyyy-MM-dd HH:mm:ss');
      const month = appointmentDate.month
      const monthName = monthsOfYear[month - 1];
      appointmentmentsByMonth[monthName] += 1;
    });

    return appointmentmentsByMonth;
  }

  getReviewsScores() {
    const reviewsScores = this.reviews.map(x => x.score);
    const scores = [1, 2, 3, 4, 5];

    const reviewsByScores = scores.reduce((acc, score) => {
      acc[score] = 0;
      return acc;
    }, {} as Record<string, number>);

    reviewsScores.forEach(x => reviewsByScores[x] += 1);

    return reviewsByScores;
  }
}
