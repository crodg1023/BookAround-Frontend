import { Component } from '@angular/core';
import { AppointmentsGroupComponent } from '../../Components/Utils/appointments-group/appointments-group.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [AppointmentsGroupComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {

}
