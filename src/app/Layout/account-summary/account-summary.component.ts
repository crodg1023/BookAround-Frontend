import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '../../Components/Utils/appointment-card/appointment-card.component';
import { AppointmentsGroupComponent } from '../../Components/Utils/appointments-group/appointments-group.component';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [AppointmentsGroupComponent],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.scss'
})
export class AccountSummaryComponent implements OnInit {
  isClient!: boolean;

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }
}
