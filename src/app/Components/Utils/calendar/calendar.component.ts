import { CommonModule } from '@angular/common';
import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  today: Signal<DateTime> = signal(DateTime.local());
  activeDay: WritableSignal<DateTime> = signal(this.today());
  firstDayOfMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(this.firstDayOfMonth().startOf('week'), this.firstDayOfMonth().endOf('month').endOf('week'))
      .splitBy({ day: 1 })
      .map(day => {
        if (day.start === null) throw new Error('Fechas incorrectas');
        return day.start
      });
  });

  get weeks() : DateTime[][] {
    const weeks: DateTime[][] = []
    let week: DateTime[] = [];

    this.daysOfMonth().forEach(day => {
      if (day.weekday === 1 && week.length) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });

    if (week.length) {
      weeks.push(week);
    }

    return weeks;
  }

  previousMonth() {
    this.firstDayOfMonth.set(
      this.firstDayOfMonth().minus({ month: 1 })
    );
  }
  nextMonth() {
    this.firstDayOfMonth.set(this.firstDayOfMonth().plus({ month: 1 }));
  }

  isNotPreviousMonth(date: DateTime) {
    return date > DateTime.local().startOf('month');
  }

  setActiveDay(day: DateTime) {
    if (day >= this.today().startOf('day')) {
      this.activeDay.set(day);
    }
  }

  checkDaysOutOfDate(day: DateTime) {
    return day >= this.today().startOf('day');
  }
}
