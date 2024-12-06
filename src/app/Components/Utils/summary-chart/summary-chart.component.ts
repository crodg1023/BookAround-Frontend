import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { AppointmentService } from '../../../Services/Appointments/appointment.service';
import { Appointment } from '../../../Interfaces/appointment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-summary-chart',
  standalone: true,
  imports: [],
  templateUrl: './summary-chart.component.html',
  styleUrl: './summary-chart.component.scss'
})
export class SummaryChartComponent implements OnInit {

  chart!: Chart;
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  get currentMonth() {
    return DateTime.now().monthLong;
  }

  fetchAppointments() {
    const businessID: number = Number(sessionStorage.getItem('business_id') || 0);
    this.appointmentService.getBusinessAppointments(businessID).subscribe(x => {
      this.appointments = x;
      this.createMonthChart();
    });
  }

  createMonthChart() {
    this.chart = new Chart(
      'chart',
      {
        type: 'bar' as ChartType,
        data: {
          labels: Object.keys(this.getCurrentMonthAppointments()),
          datasets: [{
            label: this.currentMonth,
            data: Object.values(this.getCurrentMonthAppointments()),
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
              'rgba(214, 55, 128, 0.2)',
              'rgba(92, 54, 128, 0.2)',
              'rgba(73, 46, 128, 0.2)',
              'rgba(107, 88, 128, 0.2)',
              'rgba(135, 58, 128, 0.2)',
              'rgba(163, 46, 128, 0.2)',
              'rgba(151, 107, 128, 0.2)',
              'rgba(122, 134, 128, 0.2)',
              'rgba(200, 45, 128, 0.2)',
              'rgba(160, 120, 128, 0.2)',
              'rgba(140, 76, 128, 0.2)',
              'rgba(210, 130, 128, 0.2)',
              'rgba(130, 45, 128, 0.2)',
              'rgba(90, 120, 128, 0.2)',
              'rgba(100, 50, 128, 0.2)',
              'rgba(175, 90, 128, 0.2)',
              'rgba(120, 190, 128, 0.2)',
              'rgba(85, 65, 128, 0.2)',
              'rgba(125, 105, 128, 0.2)',
              'rgba(85, 175, 128, 0.2)',
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
              'rgb(214, 55, 128)',
              'rgb(92, 54, 128)',
              'rgb(73, 46, 128)',
              'rgb(107, 88, 128)',
              'rgb(135, 58, 128)',
              'rgb(163, 46, 128)',
              'rgb(151, 107, 128)',
              'rgb(122, 134, 128)',
              'rgb(200, 45, 128)',
              'rgb(160, 120, 128)',
              'rgb(140, 76, 128)',
              'rgb(210, 130, 128)',
              'rgb(130, 45, 128)',
              'rgb(90, 120, 128)',
              'rgb(100, 50, 128)',
              'rgb(175, 90, 128)',
              'rgb(120, 190, 128)',
              'rgb(85, 65, 128)',
              'rgb(125, 105, 128)',
              'rgb(85, 175, 128)',
            ]
          }]
        }
      }
    );
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
}
