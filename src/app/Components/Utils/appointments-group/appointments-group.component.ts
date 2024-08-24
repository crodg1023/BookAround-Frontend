import { Component } from '@angular/core';
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component';

@Component({
  selector: 'app-appointments-group',
  standalone: true,
  imports: [AppointmentCardComponent],
  templateUrl: './appointments-group.component.html',
  styleUrl: './appointments-group.component.scss'
})
export class AppointmentsGroupComponent {

}
